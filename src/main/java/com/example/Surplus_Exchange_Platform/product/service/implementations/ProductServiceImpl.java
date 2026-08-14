package com.example.Surplus_Exchange_Platform.product.service.implementations;

import com.example.Surplus_Exchange_Platform.category.entity.Category;
import com.example.Surplus_Exchange_Platform.category.repository.CategoryRepository;
import com.example.Surplus_Exchange_Platform.product.dto.request.CreateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.request.UpdateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.response.ProductResponse;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.product.service.interfaces.ProductService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public ProductResponse create(
            String sellerEmail,
            CreateProductRequest request) {

        User seller = getSeller(sellerEmail);

        Category category =
                getActiveCategory(request.getCategoryId());

        validatePrices(
                request.getOriginalPrice(),
                request.getSellingPrice());

        Product product = new Product();

        product.setName(request.getName().trim());

        product.setDescription(
                request.getDescription().trim());

        product.setCondition(
                request.getCondition());

        product.setOriginalPrice(
                request.getOriginalPrice());

        product.setSellingPrice(
                request.getSellingPrice());

        product.setQuantity(
                request.getQuantity());

        product.setUnit(
                request.getUnit().trim());

        product.setSeller(seller);

        product.setCategory(category);

        /*
         * New products require admin verification.
         */
        product.setVerified(false);

        /*
         * Product should not be publicly visible
         * until admin verifies it.
         */
        product.setActive(false);

        return toResponse(
                productRepository.save(product));
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {

        Product product = productRepository.findById(id)
                .filter(Product::isActive)
                .filter(Product::isVerified)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));

        return toResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAll(
            Pageable pageable) {

        return productRepository
                .findByActiveTrueAndVerifiedTrue(pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getByCategory(
            Long categoryId,
            Pageable pageable) {

        return productRepository
                .findByCategoryIdAndActiveTrueAndVerifiedTrue(
                        categoryId,
                        pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getMyProducts(
            String sellerEmail,
            Pageable pageable) {

        User seller = getSeller(sellerEmail);

        /*
         * Seller should see all of their products,
         * including pending/unverified products.
         */
        return productRepository
                .findBySellerId(
                        seller.getId(),
                        pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional
    public ProductResponse update(
            String sellerEmail,
            Long id,
            UpdateProductRequest request) {

        User seller = getSeller(sellerEmail);

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Product not found"));

        validateOwnership(product, seller);

        validatePrices(
                request.getOriginalPrice(),
                request.getSellingPrice());

        Category category =
                getActiveCategory(
                        request.getCategoryId());

        product.setName(
                request.getName().trim());

        product.setDescription(
                request.getDescription().trim());

        product.setCondition(
                request.getCondition());

        product.setOriginalPrice(
                request.getOriginalPrice());

        product.setSellingPrice(
                request.getSellingPrice());

        product.setQuantity(
                request.getQuantity());

        product.setUnit(
                request.getUnit().trim());

        product.setCategory(category);

        /*
         * Any seller modification invalidates
         * previous admin approval.
         */
        product.setVerified(false);
        product.setActive(false);

        return toResponse(
                productRepository.save(product));
    }

    @Override
    @Transactional
    public void delete(
            String sellerEmail,
            Long id) {

        User seller = getSeller(sellerEmail);

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Product not found"));

        validateOwnership(product, seller);

        /*
         * Soft delete.
         */
        product.setActive(false);

        productRepository.save(product);
    }

    private User getSeller(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found"));

        if (user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can manage products");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private Category getActiveCategory(
            Long categoryId) {

        return categoryRepository
                .findById(categoryId)
                .filter(Category::isActive)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Active category not found"));
    }

    private void validateOwnership(
            Product product,
            User seller) {

        if (!product.getSeller()
                .getId()
                .equals(seller.getId())) {

            throw new IllegalArgumentException(
                    "You are not authorized to modify this product");
        }
    }

    private void validatePrices(
            BigDecimal originalPrice,
            BigDecimal sellingPrice) {

        if (originalPrice == null
                || sellingPrice == null) {

            throw new IllegalArgumentException(
                    "Product prices are required");
        }

        if (originalPrice.compareTo(BigDecimal.ZERO) < 0
                || sellingPrice.compareTo(BigDecimal.ZERO) < 0) {

            throw new IllegalArgumentException(
                    "Product prices cannot be negative");
        }

        if (sellingPrice.compareTo(originalPrice) > 0) {

            throw new IllegalArgumentException(
                    "Selling price cannot be greater than original price");
        }
    }

    private ProductResponse toResponse(
            Product product) {

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCondition().name(),
                product.getOriginalPrice(),
                product.getSellingPrice(),
                product.getQuantity(),
                product.getUnit(),
                product.isActive(),
                product.getSeller().getId(),
                product.getSeller().getName(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }
}