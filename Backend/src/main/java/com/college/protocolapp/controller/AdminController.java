package com.college.protocolapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.protocolapp.dto.RegisterRequest;
import com.college.protocolapp.model.Role;
import com.college.protocolapp.model.User;
import com.college.protocolapp.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String createAdmin(@RequestBody RegisterRequest request) {

        User u = new User();
        u.setEmail(request.getEmail());
        u.setPassword(passwordEncoder.encode(request.getPassword()));
        u.setRole(Role.ADMIN);

        repo.save(u);

        return "Admin Created Successfully";
    }
}