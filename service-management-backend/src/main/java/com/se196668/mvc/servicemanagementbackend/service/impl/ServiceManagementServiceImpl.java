package com.se196668.mvc.servicemanagementbackend.service.impl;
import com.se196668.mvc.servicemanagementbackend.entity.Service;
import com.se196668.mvc.servicemanagementbackend.exception.ResourceNotFoundException;
import com.se196668.mvc.servicemanagementbackend.repository.ServiceRepository;
import com.se196668.mvc.servicemanagementbackend.service.ServiceManagementService;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceManagementServiceImpl implements ServiceManagementService {

    private final ServiceRepository serviceRepository;

    public ServiceManagementServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Service not found with ID: " + id
                ));
    }

    @Override
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    @Override
    public Service updateService(Long id, Service updatedService) {
        Service existingService = getServiceById(id);

        existingService.setName(updatedService.getName());
        existingService.setPrice(updatedService.getPrice());
        existingService.setStatus(updatedService.getStatus());

        return serviceRepository.save(existingService);
    }

    @Override
    public void deleteService(Long id) {
        Service existingService = getServiceById(id);
        serviceRepository.delete(existingService);
    }
}
