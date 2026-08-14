package com.example.Surplus_Exchange_Platform.seller.dto.response;

public class SellerResponse {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String businessName;
    private String businessDescription;
    private String businessType;
    private String registrationNumber;
    private String gstNumber;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String verificationStatus;

    public SellerResponse(
            Long id,
            Long userId,
            String name,
            String email,
            String businessName,
            String businessDescription,
            String businessType,
            String registrationNumber,
            String gstNumber,
            String phone,
            String address,
            String city,
            String state,
            String pincode,
            String verificationStatus) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.businessName = businessName;
        this.businessDescription = businessDescription;
        this.businessType = businessType;
        this.registrationNumber = registrationNumber;
        this.gstNumber = gstNumber;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.verificationStatus = verificationStatus;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getBusinessName() { return businessName; }
    public String getBusinessDescription() { return businessDescription; }
    public String getBusinessType() { return businessType; }
    public String getRegistrationNumber() { return registrationNumber; }
    public String getGstNumber() { return gstNumber; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getPincode() { return pincode; }
    public String getVerificationStatus() { return verificationStatus; }

    public String getSellerName() { return businessName; }
    public String getSellerType() { return businessType; }
}
