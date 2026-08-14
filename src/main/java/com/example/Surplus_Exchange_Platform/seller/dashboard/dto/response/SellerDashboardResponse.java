package com.example.Surplus_Exchange_Platform.seller.dashboard.dto.response;

import java.math.BigDecimal;

public class SellerDashboardResponse {

    private long totalProducts;
    private long activeProducts;
    private long pendingProducts;
    private long totalOrders;
    private long pendingOrders;
    private long processingOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private long cancelledOrders;
    private long lowStockProducts;
    private long outOfStockProducts;
    private BigDecimal totalSales;

    public SellerDashboardResponse(
            long totalProducts,
            long activeProducts,
            long pendingProducts,
            long totalOrders,
            long pendingOrders,
            long processingOrders,
            long shippedOrders,
            long deliveredOrders,
            long cancelledOrders,
            long lowStockProducts,
            long outOfStockProducts,
            BigDecimal totalSales) {
        this.totalProducts = totalProducts;
        this.activeProducts = activeProducts;
        this.pendingProducts = pendingProducts;
        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.processingOrders = processingOrders;
        this.shippedOrders = shippedOrders;
        this.deliveredOrders = deliveredOrders;
        this.cancelledOrders = cancelledOrders;
        this.lowStockProducts = lowStockProducts;
        this.outOfStockProducts = outOfStockProducts;
        this.totalSales = totalSales;
    }

    public long getTotalProducts() { return totalProducts; }
    public long getActiveProducts() { return activeProducts; }
    public long getPendingProducts() { return pendingProducts; }
    public long getTotalOrders() { return totalOrders; }
    public long getPendingOrders() { return pendingOrders; }
    public long getProcessingOrders() { return processingOrders; }
    public long getShippedOrders() { return shippedOrders; }
    public long getDeliveredOrders() { return deliveredOrders; }
    public long getCancelledOrders() { return cancelledOrders; }
    public long getLowStockProducts() { return lowStockProducts; }
    public long getOutOfStockProducts() { return outOfStockProducts; }
    public BigDecimal getTotalSales() { return totalSales; }
}
