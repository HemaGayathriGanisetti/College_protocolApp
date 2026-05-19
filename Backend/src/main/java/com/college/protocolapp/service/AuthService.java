 package com.college.protocolapp.service;

import com.college.protocolapp.dto.LoginRequest;
import com.college.protocolapp.dto.LoginResponse;
import com.college.protocolapp.dto.RegisterRequest;
import com.college.protocolapp.model.Role;
import com.college.protocolapp.model.User;
import com.college.protocolapp.repository.UserRepository;
import com.college.protocolapp.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwt;

    /* =========================
        REGISTER
    ========================= */
    public String register(
            RegisterRequest request
    ) {

        String email =
                request.getEmail()
                        .toLowerCase()
                        .trim();

        // CHECK EXISTING USER
        if (
                repo.findByEmail(email)
                        .isPresent()
        ) {

            throw new RuntimeException(
                    "User already exists"
            );
        }

        User u = new User();

        // SAVE NAME
        u.setName(
                request.getName()
        );

        // SAVE EMAIL
        u.setEmail(email);

        // SAVE PASSWORD
        u.setPassword(
                encoder.encode(
                        request.getPassword()
                )
        );

        // ALWAYS STUDENT
        u.setRole(Role.STUDENT);

        repo.save(u);

        return "Registered Successfully";
    }

    /* =========================
        LOGIN
    ========================= */
    public LoginResponse login(
            LoginRequest request
    ) {

        String email =
                request.getEmail()
                        .toLowerCase()
                        .trim();

        User u = repo.findByEmail(email)
                .orElseThrow(() ->

                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );

        // PASSWORD CHECK
        if (
                !encoder.matches(
                        request.getPassword(),
                        u.getPassword()
                )
        ) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password"
            );
        }

        // GENERATE JWT
        String token =
                jwt.generateToken(
                        u.getEmail(),
                        u.getRole().name()
                );

        // RESPONSE
        return new LoginResponse(

                token,

                "Login successful",

                u.getRole().name()
        );
    }
}