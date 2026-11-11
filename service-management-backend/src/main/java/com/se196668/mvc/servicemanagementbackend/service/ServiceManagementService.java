package com.se196668.mvc.servicemanagementbackend.service;
import com.se196668.mvc.servicemanagementbackend.entity.Service;

import java.util.List;


public interface ServiceManagementService {

    // Get all services
    List<Service> getAllServices();

    // Get service by ID
    Service getServiceById(Long id);

    // Create service
    Service createService(Service service);

    // Update service
    Service updateService(Long id, Service service);

    // Delete service
    void deleteService(Long id);
}