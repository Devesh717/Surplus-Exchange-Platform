package com.example.Surplus_Exchange_Platform.wishlist.service.implementations;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import com.example.Surplus_Exchange_Platform.wishlist.dto.request.AddToWishlistRequest;
import com.example.Surplus_Exchange_Platform.wishlist.dto.response.WishlistItemResponse;
import com.example.Surplus_Exchange_Platform.wishlist.dto.response.WishlistResponse;
import com.example.Surplus_Exchange_Platform.wishlist.entity.Wishlist;
import com.example.Surplus_Exchange_Platform.wishlist.entity.WishlistItem;
import com.example.Surplus_Exchange_Platform.wishlist.repository.WishlistItemRepository;
import com.example.Surplus_Exchange_Platform.wishlist.repository.WishlistRepository;
import com.example.Surplus_Exchange_Platform.wishlist.service.interfaces.WishlistService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public WishlistServiceImpl(
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public WishlistResponse getWishlist(String buyerEmail) {

        User buyer = getBuyer(buyerEmail);
        Wishlist wishlist = getOrCreateWishlist(buyer);

        return toResponse(wishlist);
    }

    @Override
    @Transactional
    public WishlistResponse addToWishlist(
            String buyerEmail,
            AddToWishlistRequest request) {

        User buyer = getBuyer(buyerEmail);

        Product product = productRepository.findById(
                request.getProductId()
        ).orElseThrow(() ->
                new IllegalArgumentException(
                        "Product not found"));

        if (!product.isActive() || !product.isVerified()) {
            throw new IllegalArgumentException(
                    "Product is no longer available");
        }

        Wishlist wishlist = getOrCreateWishlist(buyer);

        if (wishlistItemRepository
                .findByWishlistIdAndProductId(
                        wishlist.getId(),
                        product.getId())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Product is already in wishlist");
        }

        WishlistItem item = new WishlistItem();

        item.setProduct(product);

        // Maintain both sides of the relationship
        wishlist.addItem(item);

        wishlistItemRepository.save(item);

        return toResponse(wishlist);
    }

    @Override
    @Transactional
    public void removeItem(
            String buyerEmail,
            Long itemId) {

        User buyer = getBuyer(buyerEmail);
        Wishlist wishlist = getOrCreateWishlist(buyer);

        WishlistItem item = wishlistItemRepository
                .findByIdAndWishlistId(
                        itemId,
                        wishlist.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Wishlist item not found"));

        wishlistItemRepository.delete(item);
    }

    @Override
    @Transactional
    public void clearWishlist(String buyerEmail) {

        User buyer = getBuyer(buyerEmail);
        Wishlist wishlist = getOrCreateWishlist(buyer);

        wishlist.getItems().clear();
        wishlistRepository.save(wishlist);
    }

    private User getBuyer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.BUYER
                && user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only buyers and approved sellers can manage wishlists");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private Wishlist getOrCreateWishlist(User buyer) {

        return wishlistRepository
                .findByBuyerId(buyer.getId())
                .orElseGet(() -> {

                    Wishlist wishlist = new Wishlist();
                    wishlist.setBuyer(buyer);
                    wishlist.setItems(new ArrayList<>());

                    return wishlistRepository.save(wishlist);
                });
    }

    private WishlistResponse toResponse(
            Wishlist wishlist) {

        var items = wishlist.getItems()
                .stream()
                .map(item -> {

                    Product product = item.getProduct();

                    return new WishlistItemResponse(
                            item.getId(),
                            product.getId(),
                            product.getName(),
                            product.getSellingPrice(),
                            product.getQuantity(),
                            product.getUnit(),
                            product.isActive()
                                    && product.getQuantity() > 0
                    );
                })
                .toList();

        return new WishlistResponse(
                wishlist.getId(),
                items
        );
    }
}
