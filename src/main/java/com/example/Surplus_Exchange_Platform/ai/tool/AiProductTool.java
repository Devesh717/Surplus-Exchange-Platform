package com.example.Surplus_Exchange_Platform.ai.tool;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.entity.ProductCondition;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class AiProductTool {

    @PersistenceContext
    private EntityManager entityManager;

    @Tool(description = """
            Search publicly available surplus products.

            Use this tool whenever the user asks about:
            - available products
            - product recommendations
            - prices
            - stock
            - product condition
            - product categories
            - products under a budget
            - products matching a keyword

            Only active, admin-verified and in-stock products are returned.

            Parameters:
            keyword = product keyword such as laptop, shirt, rice, drill
            minPrice = minimum selling price
            maxPrice = maximum selling price
            condition = NEW, USED, or REFURBISHED
            """)
    public String searchProducts(
            String keyword,
            Double minPrice,
            Double maxPrice,
            String condition) {

        log.info("========== AI PRODUCT TOOL ==========");
        log.info("keyword     = {}", keyword);
        log.info("minPrice    = {}", minPrice);
        log.info("maxPrice    = {}", maxPrice);
        log.info("condition   = {}", condition);

        StringBuilder jpql = new StringBuilder("""
                SELECT p FROM Product p
                WHERE p.active = true
                  AND p.verified = true
                  AND p.quantity > 0
                """);

        /*
         * Search every keyword separately.
         *
         * Example:
         * "refurbished laptop"
         *
         * becomes:
         *
         * laptop
         *
         * because condition is handled separately.
         */
        String normalizedKeyword = normalizeKeyword(keyword);

        if (!normalizedKeyword.isBlank()) {

            jpql.append("""
                    AND (
                        LOWER(p.name) LIKE :keyword
                        OR LOWER(p.description) LIKE :keyword
                    )
                    """);
        }

        if (minPrice != null) {
            jpql.append(
                    " AND p.sellingPrice >= :minPrice");
        }

        if (maxPrice != null) {
            jpql.append(
                    " AND p.sellingPrice <= :maxPrice");
        }

        if (condition != null && !condition.isBlank()) {
            jpql.append(
                    " AND p.condition = :condition");
        }

        jpql.append(
                " ORDER BY p.sellingPrice ASC");

        log.debug("JPQL = {}", jpql);

        var query = entityManager.createQuery(
                jpql.toString(),
                Product.class
        );

        if (!normalizedKeyword.isBlank()) {
            query.setParameter(
                    "keyword",
                    "%" + normalizedKeyword + "%"
            );
        }

        if (minPrice != null) {
            query.setParameter(
                    "minPrice",
                    minPrice
            );
        }

        if (maxPrice != null) {
            query.setParameter(
                    "maxPrice",
                    maxPrice
            );
        }

        if (condition != null && !condition.isBlank()) {

            try {

                query.setParameter(
                        "condition",
                        ProductCondition.valueOf(
                                condition.trim()
                                        .toUpperCase()
                        )
                );

            } catch (IllegalArgumentException e) {

                log.warn(
                        "Invalid product condition received: {}",
                        condition
                );

                return "Invalid product condition. " +
                        "Valid conditions are NEW, USED, or REFURBISHED.";
            }
        }

        List<Product> products =
                query.setMaxResults(10)
                        .getResultList();

        log.info(
                "AI PRODUCT TOOL found {} products",
                products.size()
        );

        if (products.isEmpty()) {

            log.info(
                    "No products found for keyword={}, minPrice={}, maxPrice={}, condition={}",
                    keyword,
                    minPrice,
                    maxPrice,
                    condition
            );

            return "No matching active, verified and in-stock products were found.";
        }

        String result = products.stream()
                .map(p -> String.format(
                        "ID: %d | Name: %s | Condition: %s | Price: INR %s | Unit: %s | Quantity: %d",
                        p.getId(),
                        p.getName(),
                        p.getCondition(),
                        p.getSellingPrice(),
                        p.getUnit(),
                        p.getQuantity()
                ))
                .reduce(
                        (a, b) -> a + "\n" + b
                )
                .orElse(
                        "No matching products were found."
                );

        log.info("AI PRODUCT TOOL RESULT:\n{}", result);
        log.info("====================================");

        return result;
    }

    private String normalizeKeyword(String keyword) {

        if (keyword == null) {
            return "";
        }

        String value = keyword
                .trim()
                .toLowerCase();

        /*
         * Very simple singularization.
         *
         * laptops -> laptop
         * shirts  -> shirt
         * drills  -> drill
         *
         * This is intentionally simple for your project.
         */
        if (value.endsWith("s")
                && value.length() > 3) {

            value = value.substring(
                    0,
                    value.length() - 1
            );
        }

        return value;
    }
}