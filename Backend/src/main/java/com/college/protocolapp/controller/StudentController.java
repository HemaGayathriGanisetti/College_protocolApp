 package com.college.protocolapp.controller;

import com.college.protocolapp.dto.StudentRequest;
import com.college.protocolapp.dto.StudentResponse;
import com.college.protocolapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;
 
    @PostMapping
    public StudentResponse addStudent(
            @RequestBody StudentRequest request,
            @RequestHeader("Authorization") String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token");
        }

        return studentService.addStudent(request, token);
    }

  
    @GetMapping
    public List<StudentResponse> getAll() {
        return studentService.getAll();
    }

     
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}