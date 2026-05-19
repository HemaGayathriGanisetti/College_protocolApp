package com.college.protocolapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.college.protocolapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}