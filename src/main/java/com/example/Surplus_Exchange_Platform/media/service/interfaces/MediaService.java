package com.example.Surplus_Exchange_Platform.media.service.interfaces;

import com.example.Surplus_Exchange_Platform.media.dto.response.ProductImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MediaService {

    ProductImageResponse uploadProductImage(
            String sellerEmail,
            Long productId,
            MultipartFile file,
            boolean primaryImage);

    List<ProductImageResponse> getProductImages(
            Long productId);

    void deleteProductImage(
            String sellerEmail,
            Long productId,
            Long imageId);

    void setPrimaryImage(
            String sellerEmail,
            Long productId,
            Long imageId);
}
