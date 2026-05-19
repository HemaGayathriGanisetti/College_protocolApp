package com.college.protocolapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.college.protocolapp.model.Lab;

@Repository
public interface LabRepository extends JpaRepository<Lab, Long> {
	 List<Lab> findByNameContainingIgnoreCase(String keyword);
}
