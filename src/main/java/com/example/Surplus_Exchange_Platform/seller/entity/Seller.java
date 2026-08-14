package com.example.Surplus_Exchange_Platform.seller.entity;

import com.example.Surplus_Exchange_Platform.user.entity.User;
import jakarta.persistence.*;

@Entity
@Table(name = "sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String businessName;

    @Column(length = 1000)
    private String businessDescription;

    @Column(nullable = false, length = 100)
    private String businessType;

    @Column(nullable = false, unique = true, length = 100)
    private String registrationNumber;

    @Column(length = 100)
    private String gstNumber;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, length = 10)
    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SellerVerificationStatus verificationStatus =
            SellerVerificationStatus.PENDING;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id", nullable = false, unique = true)
    private User seller;

    public Seller() {
    }

    public Long getId() { return id; }
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
    public SellerVerificationStatus getVerificationStatus() { return verificationStatus; }
    public User getSeller() { return seller; }

    public void setId(Long id) { this.id = id; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public void setBusinessDescription(String businessDescription) { this.businessDescription = businessDescription; }
    public void setBusinessType(String businessType) { this.businessType = businessType; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAddress(String address) { this.address = address; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public void setVerificationStatus(SellerVerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }
    public void setSeller(User seller) { this.seller = seller; }

    // Backward-compatible getters/setters used by existing seller code.
    public String getSellerName() { return businessName; }
    public String getSellerType() { return businessType; }
    public void setSellerName(String businessName) { this.businessName = businessName; }
    public void setSellerType(String businessType) { this.businessType = businessType; }
}
