package com.example.Surplus_Exchange_Platform.media.entity;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false, unique = true, length = 300)
    private String publicId;

    @Column(nullable = false)
    private boolean primaryImage = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public ProductImage() {
    }

    public Long getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public String getPublicId() { return publicId; }
    public boolean isPrimaryImage() { return primaryImage; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Product getProduct() { return product; }

    public void setId(Long id) { this.id = id; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setPublicId(String publicId) { this.publicId = publicId; }
    public void setPrimaryImage(boolean primaryImage) { this.primaryImage = primaryImage; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setProduct(Product product) { this.product = product; }
}
