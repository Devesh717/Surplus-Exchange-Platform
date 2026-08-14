package com.example.Surplus_Exchange_Platform.media.service.implementations;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Surplus_Exchange_Platform.media.dto.response.ProductImageResponse;
import com.example.Surplus_Exchange_Platform.media.entity.ProductImage;
import com.example.Surplus_Exchange_Platform.media.repository.ProductImageRepository;
import com.example.Surplus_Exchange_Platform.media.service.interfaces.MediaService;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class MediaServiceImpl implements MediaService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private final Cloudinary cloudinary;
    private final ProductImageRepository imageRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public MediaServiceImpl(
            Cloudinary cloudinary,
            ProductImageRepository imageRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.cloudinary = cloudinary;
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ProductImageResponse uploadProductImage(
            String sellerEmail,
            Long productId,
            MultipartFile file,
            boolean primaryImage) {

        User seller = getSeller(sellerEmail);

        Product product = getSellerProduct(
                seller.getId(),
                productId);

        validateFile(file);

        try {

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder",
                            "surplus-exchange/products/" + productId,
                            "resource_type",
                            "image"
                    )
            );

            String secureUrl =
                    String.valueOf(result.get("secure_url"));

            String publicId =
                    String.valueOf(result.get("public_id"));

            /*
             * First image automatically becomes primary.
             */
            boolean makePrimary =
                    primaryImage
                            || imageRepository.countByProductId(productId) == 0;

            /*
             * Remove primary status from the existing image.
             */
            if (makePrimary) {
                clearPrimaryImage(productId);
            }

            ProductImage image = new ProductImage();

            image.setProduct(product);
            image.setImageUrl(secureUrl);
            image.setPublicId(publicId);
            image.setPrimaryImage(makePrimary);

            /*
             * Any media change requires the product
             * to be reviewed by admin again.
             */
            product.setVerified(false);
            product.setActive(false);

            productRepository.save(product);

            ProductImage savedImage =
                    imageRepository.save(image);

            return toResponse(savedImage);

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Unable to upload product image",
                    exception
            );
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductImageResponse> getProductImages(
            Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException(
                    "Product not found");
        }

        return imageRepository
                .findByProductIdOrderByPrimaryImageDescCreatedAtAsc(
                        productId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteProductImage(
            String sellerEmail,
            Long productId,
            Long imageId) {

        User seller = getSeller(sellerEmail);

        Product product = getSellerProduct(
                seller.getId(),
                productId);

        ProductImage image =
                imageRepository.findByIdAndProductId(
                        imageId,
                        productId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Product image not found"));

        String publicId = image.getPublicId();
        boolean wasPrimary = image.isPrimaryImage();

        imageRepository.delete(image);

        try {
            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type", "image"));

            if (wasPrimary) {
                imageRepository
                        .findByProductIdOrderByPrimaryImageDescCreatedAtAsc(
                                productId)
                        .stream()
                        .findFirst()
                        .ifPresent(next -> {
                            next.setPrimaryImage(true);
                            imageRepository.save(next);
                        });
            }

            /*
             * Media changes invalidate the existing product approval.
             */
            product.setVerified(false);
            product.setActive(false);
            productRepository.save(product);

        } catch (Exception exception) {
            throw new IllegalStateException(
                    "Unable to delete product image",
                    exception);
        }
    }

    @Override
    @Transactional
    public void setPrimaryImage(
            String sellerEmail,
            Long productId,
            Long imageId) {

        User seller = getSeller(sellerEmail);

        Product product = getSellerProduct(
                seller.getId(),
                productId);

        ProductImage image =
                imageRepository.findByIdAndProductId(
                        imageId,
                        productId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Product image not found"));

        clearPrimaryImage(productId);

        image.setPrimaryImage(true);
        imageRepository.save(image);

        /*
         * Changing the primary image is a listing change.
         */
        product.setVerified(false);
        product.setActive(false);
        productRepository.save(product);
    }

    private void clearPrimaryImage(Long productId) {

        imageRepository
                .findByProductIdAndPrimaryImageTrue(productId)
                .ifPresent(existing -> {
                    existing.setPrimaryImage(false);
                    imageRepository.save(existing);
                });
    }

    private User getSeller(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can manage product images");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private Product getSellerProduct(
            Long sellerId,
            Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));

        if (!product.getSeller().getId().equals(sellerId)) {
            throw new IllegalArgumentException(
                    "You are not authorized to modify this product");
        }

        return product;
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Image file is required");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Image size cannot exceed 5 MB");
        }

        String contentType = file.getContentType();

        if (contentType == null
                || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException(
                    "Only image files are allowed");
        }
    }

    private ProductImageResponse toResponse(
            ProductImage image) {

        return new ProductImageResponse(
                image.getId(),
                image.getProduct().getId(),
                image.getImageUrl(),
                image.isPrimaryImage(),
                image.getCreatedAt()
        );
    }
}
