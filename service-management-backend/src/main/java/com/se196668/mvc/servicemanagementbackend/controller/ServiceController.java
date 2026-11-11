package com.se196668.mvc.servicemanagementbackend.controller;

import com.se196668.mvc.servicemanagementbackend.entity.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.se196668.mvc.servicemanagementbackend.service.ServiceManagementService;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceManagementService serviceManagementService;

    public ServiceController(ServiceManagementService serviceManagementService) {
        this.serviceManagementService = serviceManagementService;
    }

    // GET: Get all services
    @GetMapping
    public List<Service> getAllServices() {
        return serviceManagementService.getAllServices();
    }

    // GET: Get service by ID
    @GetMapping("/{id}")
    public Service getServiceById(@PathVariable Long id) {
        return serviceManagementService.getServiceById(id);
    }

    // POST: Create new service
    @PostMapping
    public ResponseEntity<Service> createService(
            @RequestBody Service service) {

        Service createdService =
                serviceManagementService.createService(service);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdService);
    }

    // PUT: Update service
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @RequestBody Service service
    ) {
        Service updatedService =
                serviceManagementService.updateService(id, service);

        return ResponseEntity.ok(updatedService);
    }

    // DELETE: Delete service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {

        serviceManagementService.deleteService(id);

        return ResponseEntity.noContent().build();
    }
}