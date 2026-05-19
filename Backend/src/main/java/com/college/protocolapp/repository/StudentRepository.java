package com.college.protocolapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.college.protocolapp.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	
}
