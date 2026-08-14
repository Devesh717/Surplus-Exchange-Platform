package com.example.Surplus_Exchange_Platform.ai.service.implementations;

import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductDescriptionRequest;
import com.example.Surplus_Exchange_Platform.ai.service.interfaces.AiService;
import com.example.Surplus_Exchange_Platform.ai.tool.AiProductTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;
    private final AiProductTool productTool;

    public AiServiceImpl(ChatClient chatClient, AiProductTool productTool) {
        this.chatClient = chatClient;
        this.productTool = productTool;
    }

    @Override
    public String generateProductDescription(
            ProductDescriptionRequest request) {

        log.info("========== AI PRODUCT DESCRIPTION ==========");

        log.info("Product name: {}", request.getProductName());
        log.info("Condition: {}", request.getCondition());
        log.info("Specifications present: {}",
                request.getSpecifications() != null);
        log.info("Additional details present: {}",
                request.getAdditionalDetails() != null);

        String prompt = """
            You are an assistant for a B2B surplus materials marketplace.

            Generate a professional, factual product description.
            Do not invent specifications that were not provided.
            Do not exaggerate product quality.
            Keep the description suitable for a business marketplace.

            Product Name: %s
            Condition: %s
            Specifications: %s
            Additional Details: %s

            Return only the product description.
            """.formatted(
                request.getProductName(),
                request.getCondition(),
                nullToEmpty(request.getSpecifications()),
                nullToEmpty(request.getAdditionalDetails())
        );

        log.info("Prompt created successfully");
        log.debug("Prompt length: {}", prompt.length());

        try {

            log.info("Calling ChatClient...");
            log.info("Sending request to Gemini...");

            String response = chatClient
                    .prompt()
                    .user(prompt)
                    .tools(productTool)
                    .call()
                    .content();

            log.info("Gemini response received");
            log.info("Response is null: {}", response == null);

            if (response != null) {
                log.info("Response length: {}", response.length());
                log.debug("Response: {}", response);
            }

            log.info("============================================");

            return response;

        } catch (Exception e) {

            log.error("========== GEMINI AI ERROR ==========");
            log.error("Exception type: {}",
                    e.getClass().getName());
            log.error("Exception message: {}",
                    e.getMessage());
            log.error("Full Gemini exception", e);
            log.error("=====================================");

            throw e;
        }
    }

    @Override
    public String chat(String message) {

        String systemPrompt = """
                You are the customer support and product assistant for a B2B surplus materials marketplace.

                You can help with:
                - product browsing and recommendations
                - product listings
                - orders
                - payments
                - seller listings
                - account-related general questions

                When the user asks for actual marketplace products, prices, stock, conditions,
                or recommendations based on inventory, use the available product search tool.
                Never invent a product, price, quantity, seller, order status, or payment status.

                Do not claim that you completed an action such as cancelling an order or issuing
                a refund unless the application actually performed that action.

                If account-specific information is required and no application tool provides it,
                clearly tell the user to use the relevant application feature or contact support.
                """;

        return chatClient.prompt()
                .system(systemPrompt)
                .user(message)
                .tools(productTool)
                .call()
                .content();
    }

    @Override
    public String recommendProducts(String requirement) {

        String systemPrompt = """
                You are a product recommendation assistant for a B2B surplus marketplace.
                Search the marketplace inventory before recommending products.
                Only recommend products returned by the product search tool.
                Do not invent products, prices, stock, or specifications.
                If no suitable products are found, clearly say so.
                Keep the answer concise and useful.
                """;

        return chatClient.prompt()
                .system(systemPrompt)
                .user(requirement)
                .tools(productTool)
                .call()
                .content();
    }

    private String nullToEmpty(String value) {
        return value == null ? "" : value;
    }
}
