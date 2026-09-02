package com.example.Surplus_Exchange_Platform.user.dashboard.service.implementations;

import com.example.Surplus_Exchange_Platform.order.repository.OrderRepository;
import com.example.Surplus_Exchange_Platform.user.dashboard.dto.response.UserDashboardResponse;
import com.example.Surplus_Exchange_Platform.user.dashboard.service.interfaces.UserDashboardService;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDashboardServiceImpl
        implements UserDashboardService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public UserDashboardServiceImpl(
            UserRepository userRepository,
            OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDashboardResponse getDashboard(
            String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        long totalOrders =
                orderRepository.countByBuyerId(
                        user.getId());

        return new UserDashboardResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                totalOrders
        );
    }
}
