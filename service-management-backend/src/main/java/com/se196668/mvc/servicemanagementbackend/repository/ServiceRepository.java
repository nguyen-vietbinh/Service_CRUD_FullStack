package com.se196668.mvc.servicemanagementbackend.repository;

import com.se196668.mvc.servicemanagementbackend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
}