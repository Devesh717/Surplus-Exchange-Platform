package com.example.Surplus_Exchange_Platform.media.api;

import com.example.Surplus_Exchange_Platform.media.dto.response.ProductImageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(
        name = "Product Media",
        description = "Product Image Management with Cloudinary"
)
public interface MediaApi {

    @Operation(
            summary = "Upload Product Image",
            description = "Upload a product image to Cloudinary")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Image uploaded"),
            @ApiResponse(responseCode = "400", description = "Invalid image"),
            @ApiResponse(responseCode = "403", description = "Seller access required")
    })
    ResponseEntity<ProductImageResponse> upload(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean primaryImage,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get Product Images",
            description = "Get all images of a product")
    ResponseEntity<List<ProductImageResponse>> getImages(
            @PathVariable Long productId);

    @Operation(
            summary = "Delete Product Image",
            description = "Delete a product image from Cloudinary")
    ResponseEntity<Void> delete(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Set Primary Image",
            description = "Set one product image as the primary image")
    ResponseEntity<Void> setPrimary(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            org.springframework.security.core.Authentication authentication);
}
