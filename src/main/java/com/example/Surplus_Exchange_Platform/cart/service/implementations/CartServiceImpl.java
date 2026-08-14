package com.example.Surplus_Exchange_Platform.cart.service.implementations;

import com.example.Surplus_Exchange_Platform.cart.dto.request.AddToCartRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.request.UpdateCartItemRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartItemResponse;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartResponse;
import com.example.Surplus_Exchange_Platform.cart.entity.Cart;
import com.example.Surplus_Exchange_Platform.cart.entity.CartItem;
import com.example.Surplus_Exchange_Platform.cart.repository.CartItemRepository;
import com.example.Surplus_Exchange_Platform.cart.repository.CartRepository;
import com.example.Surplus_Exchange_Platform.cart.service.interfaces.CartService;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public CartResponse getCart(String buyerEmail) {

        User buyer = getBuyer(buyerEmail);
        Cart cart = getOrCreateCart(buyer);

        return toResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addToCart(
            String buyerEmail,
            AddToCartRequest request) {

        User buyer = getBuyer(buyerEmail);

        Product product = getAvailableProduct(
                request.getProductId());

        validateStock(
                product,
                request.getQuantity());

        Cart cart = getOrCreateCart(buyer);

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        product.getId())
                .orElse(null);

        if (item == null) {

            item = new CartItem();

            item.setProduct(product);
            item.setQuantity(request.getQuantity());

            // Maintains both sides of the relationship
            cart.addItem(item);

            cartItemRepository.save(item);

        } else {

            int newQuantity =
                    item.getQuantity()
                            + request.getQuantity();

            validateStock(product, newQuantity);

            item.setQuantity(newQuantity);

            cartItemRepository.save(item);
        }

        return toResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse updateItem(
            String buyerEmail,
            Long itemId,
            UpdateCartItemRequest request) {

        User buyer = getBuyer(buyerEmail);
        Cart cart = getOrCreateCart(buyer);

        CartItem item = cartItemRepository
                .findByIdAndCartId(
                        itemId,
                        cart.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Cart item not found"));

        validateStock(
                item.getProduct(),
                request.getQuantity());

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return toResponse(cart);
    }

    @Override
    @Transactional
    public void removeItem(
            String buyerEmail,
            Long itemId) {

        User buyer = getBuyer(buyerEmail);
        Cart cart = getOrCreateCart(buyer);

        CartItem item = cartItemRepository
                .findByIdAndCartId(
                        itemId,
                        cart.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Cart item not found"));

        cartItemRepository.delete(item);
    }

    @Override
    @Transactional
    public void clearCart(String buyerEmail) {

        User buyer = getBuyer(buyerEmail);
        Cart cart = getOrCreateCart(buyer);

        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private User getBuyer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.BUYER
                && user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only buyers and approved sellers can manage carts");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private Cart getOrCreateCart(User buyer) {

        return cartRepository.findByBuyerId(buyer.getId())
                .orElseGet(() -> {

                    Cart cart = new Cart();
                    cart.setBuyer(buyer);
                    cart.setItems(new ArrayList<>());

                    return cartRepository.save(cart);
                });
    }

    private Product getAvailableProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));

        if (!product.isActive() || !product.isVerified()) {
            throw new IllegalArgumentException(
                    "Product is not available for purchase");
        }

        return product;
    }

    private void validateStock(
            Product product,
            int requestedQuantity) {

        if (requestedQuantity > product.getQuantity()) {
            throw new IllegalArgumentException(
                    "Requested quantity exceeds available stock");
        }
    }

    private CartResponse toResponse(Cart cart) {

        var items = cart.getItems()
                .stream()
                .map(item -> {

                    BigDecimal subtotal =
                            item.getProduct()
                                    .getSellingPrice()
                                    .multiply(
                                            BigDecimal.valueOf(
                                                    item.getQuantity()));

                    return new CartItemResponse(
                            item.getId(),
                            item.getProduct().getId(),
                            item.getProduct().getName(),
                            item.getProduct().getSellingPrice(),
                            item.getQuantity(),
                            item.getProduct().getUnit(),
                            subtotal
                    );
                })
                .toList();

        BigDecimal total = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add);

        return new CartResponse(
                cart.getId(),
                items,
                total
        );
    }
}
