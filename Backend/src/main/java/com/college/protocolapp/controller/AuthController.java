package com.college.protocolapp.controller;

import org.springframework.beans.factory.annotation.Autowired;

 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
 
import org.springframework.web.bind.annotation.RestController;

import com.college.protocolapp.dto.LoginRequest;
import com.college.protocolapp.dto.LoginResponse;
import com.college.protocolapp.dto.RegisterRequest;
import com.college.protocolapp.service.AuthService;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}