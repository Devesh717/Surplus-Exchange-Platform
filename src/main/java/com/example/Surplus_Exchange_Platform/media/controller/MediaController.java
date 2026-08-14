package com.example.Surplus_Exchange_Platform.media.controller;

import com.example.Surplus_Exchange_Platform.media.api.MediaApi;
import com.example.Surplus_Exchange_Platform.media.dto.response.ProductImageResponse;
import com.example.Surplus_Exchange_Platform.media.service.interfaces.MediaService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class MediaController implements MediaApi {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @Override
    @PostMapping(
            value = "/{productId}/images",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductImageResponse> upload(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean primaryImage,
            Authentication authentication) {

        System.out.println("========== MEDIA UPLOAD ==========");
        System.out.println("PRODUCT ID = " + productId);
        System.out.println("FILE = " + file.getOriginalFilename());
        System.out.println("FILE SIZE = " + file.getSize());
        System.out.println("PRIMARY = " + primaryImage);
        System.out.println("USER = " + authentication.getName());

        return ResponseEntity.ok(
                mediaService.uploadProductImage(
                        authentication.getName(),
                        productId,
                        file,
                        primaryImage)
        );
    }

    @Override
    @GetMapping("/{productId}/images")
    public ResponseEntity<List<ProductImageResponse>> getImages(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                mediaService.getProductImages(productId));
    }

    @Override
    @DeleteMapping("/{productId}/images/{imageId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            Authentication authentication) {

        mediaService.deleteProductImage(
                authentication.getName(),
                productId,
                imageId);

        return ResponseEntity.ok().build();
    }

    @Override
    @PutMapping("/{productId}/images/{imageId}/primary")
    public ResponseEntity<Void> setPrimary(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            Authentication authentication) {

        mediaService.setPrimaryImage(
                authentication.getName(),
                productId,
                imageId);

        return ResponseEntity.ok().build();
    }
}
