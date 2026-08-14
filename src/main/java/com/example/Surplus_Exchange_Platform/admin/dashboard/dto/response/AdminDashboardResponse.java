package com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response;

public class AdminDashboardResponse {

    private long totalUsers;
    private long totalBuyers;
    private long totalSellers;
    private long totalAdmins;
    private long totalProducts;
    private long verifiedProducts;
    private long pendingProducts;
    private long totalSellerApplications;
    private long verifiedSellerApplications;
    private long pendingSellerApplications;

    public AdminDashboardResponse(
            long totalUsers,
            long totalBuyers,
            long totalSellers,
            long totalAdmins,
            long totalProducts,
            long verifiedProducts,
            long pendingProducts,
            long totalSellerApplications,
            long verifiedSellerApplications,
            long pendingSellerApplications) {
        this.totalUsers = totalUsers;
        this.totalBuyers = totalBuyers;
        this.totalSellers = totalSellers;
        this.totalAdmins = totalAdmins;
        this.totalProducts = totalProducts;
        this.verifiedProducts = verifiedProducts;
        this.pendingProducts = pendingProducts;
        this.totalSellerApplications = totalSellerApplications;
        this.verifiedSellerApplications = verifiedSellerApplications;
        this.pendingSellerApplications = pendingSellerApplications;
    }

    public long getTotalUsers() { return totalUsers; }
    public long getTotalBuyers() { return totalBuyers; }
    public long getTotalSellers() { return totalSellers; }
    public long getTotalAdmins() { return totalAdmins; }
    public long getTotalProducts() { return totalProducts; }
    public long getVerifiedProducts() { return verifiedProducts; }
    public long getPendingProducts() { return pendingProducts; }
    public long getTotalSellerApplications() { return totalSellerApplications; }
    public long getVerifiedSellerApplications() { return verifiedSellerApplications; }
    public long getPendingSellerApplications() { return pendingSellerApplications; }
}
