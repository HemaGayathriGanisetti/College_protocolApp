 package com.college.protocolapp.service;

import com.college.protocolapp.model.Rule;
import com.college.protocolapp.repository.RuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RuleService {

    private final RuleRepository repository;

    public RuleService(RuleRepository repository) {
        this.repository = repository;
    }

    // ✅ get all rules
    public List<Rule> getAllRules() {
        return repository.findAll();
    }

    // ✅ save rule
    public Rule saveRule(Rule rule) {
        return repository.save(rule);
    }

    // ✅ FIX: get rules by category ID (IMPORTANT)
    public List<Rule> getRulesByCategoryId(Long categoryId) {
        return repository.findByCategoryId(categoryId);
    }
    
    public List<Rule> searchRules(String keyword) {
    
    return repository.searchRules(keyword);
}
}