package com.college.protocolapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.college.protocolapp.model.Role;
import com.college.protocolapp.model.User;
import com.college.protocolapp.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner run(UserRepository repo, PasswordEncoder encoder) {
        return args -> {

            if (repo.findByEmail("admin@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                repo.save(admin);
            }
        };
    }
}