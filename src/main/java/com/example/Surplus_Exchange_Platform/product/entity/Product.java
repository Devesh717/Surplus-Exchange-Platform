package com.example.Surplus_Exchange_Platform.product.entity;

import com.example.Surplus_Exchange_Platform.category.entity.Category;
import com.example.Surplus_Exchange_Platform.product.enums.ProductVerificationStatus;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 5000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_condition", nullable = false)
    private ProductCondition condition;

    @Column(nullable = false)
    private BigDecimal originalPrice;

    @Column(nullable = false)
    private BigDecimal sellingPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String unit;

    /*
     * Product is visible to buyers only when active
     * and verified by admin.
     */
    @Column(nullable = false)
    private boolean active = false;

    /*
     * Admin verification status.
     */
    @Column(nullable = false)
    private boolean verified = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductVerificationStatus verificationStatus = ProductVerificationStatus.PENDING;

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public ProductCondition getCondition() {
        return condition;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isVerified() {
        return verified;
    }

    public User getSeller() {
        return seller;
    }

    public Category getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCondition(ProductCondition condition) {
        this.condition = condition;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public ProductVerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(ProductVerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }
}