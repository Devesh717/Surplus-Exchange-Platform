package com.example.Surplus_Exchange_Platform.stock.service.implementations;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.stock.dto.request.UpdateStockRequest;
import com.example.Surplus_Exchange_Platform.stock.dto.response.StockResponse;
import com.example.Surplus_Exchange_Platform.stock.service.interfaces.StockService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StockServiceImpl implements StockService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public StockServiceImpl(
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public StockResponse getStock(Long productId) {

        Product product = getProduct(productId);

        return toResponse(product);
    }

    @Override
    @Transactional
    public StockResponse updateStock(
            String sellerEmail,
            Long productId,
            UpdateStockRequest request) {

        User seller = getSeller(sellerEmail);
        Product product = getProduct(productId);

        verifyOwnership(product, seller);

        product.setQuantity(request.getQuantity());

        if (product.getQuantity() == 0) {
            product.setActive(false);
        }

        return toResponse(
                productRepository.save(product));
    }

    @Override
    @Transactional
    public StockResponse increaseStock(
            String sellerEmail,
            Long productId,
            int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        User seller = getSeller(sellerEmail);
        Product product = getProduct(productId);

        verifyOwnership(product, seller);

        product.setQuantity(
                product.getQuantity() + quantity);

        return toResponse(
                productRepository.save(product));
    }

    @Override
    @Transactional
    public StockResponse decreaseStock(
            Long productId,
            int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        Product product = getProduct(productId);

        if (product.getQuantity() < quantity) {
            throw new IllegalArgumentException(
                    "Insufficient stock");
        }

        product.setQuantity(
                product.getQuantity() - quantity);

        if (product.getQuantity() == 0) {
            product.setActive(false);
        }

        return toResponse(
                productRepository.save(product));
    }

    private Product getProduct(Long productId) {

        return productRepository.findById(productId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));
    }

    private User getSeller(String email) {

        User seller = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        if (seller.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can manage stock");
        }

        return seller;
    }

    private void verifyOwnership(
            Product product,
            User seller) {

        if (!product.getSeller().getId()
                .equals(seller.getId())) {

            throw new IllegalArgumentException(
                    "You are not authorized to manage this product stock");
        }
    }

    private StockResponse toResponse(Product product) {

        return new StockResponse(
                product.getId(),
                product.getQuantity(),
                product.getUnit(),
                product.getQuantity() > 0
        );
    }
}
