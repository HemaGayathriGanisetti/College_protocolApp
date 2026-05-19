package com.college.protocolapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.college.protocolapp.model.Rule;
public interface RuleRepository extends JpaRepository<Rule, Long> {

    List<Rule> findByCategoryId(Long categoryId);

    List<Rule> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title,
            String description
    );
}