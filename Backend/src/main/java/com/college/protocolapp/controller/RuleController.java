  package com.college.protocolapp.controller;

import com.college.protocolapp.model.Category;

import com.college.protocolapp.model.Rule;
import com.college.protocolapp.repository.CategoryRepository;
import com.college.protocolapp.repository.RuleRepository;
import com.college.protocolapp.service.RuleService;

 
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rules")
@CrossOrigin
public class RuleController {
	private final RuleRepository ruleRepository;
	private final CategoryRepository categoryRepository;
	private final RuleService ruleService;

     
    public RuleController(RuleRepository ruleRepository,
                          CategoryRepository categoryRepository,
                          RuleService ruleService) {
        this.ruleRepository = ruleRepository;
        this.categoryRepository = categoryRepository;
        this.ruleService = ruleService;
    }

     
    @GetMapping
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }

     
    @GetMapping("/categories/{categoryId}")
    public List<Rule> getRulesByCategory(@PathVariable Long categoryId) {
        return ruleRepository.findByCategoryId(categoryId);
    }
 
    @GetMapping("/{id}")
    public Rule getRuleById(@PathVariable Long id) {
        return ruleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));
    }

     
    @PostMapping("/categories/{categoryId}")
    public Rule createRule(@PathVariable Long categoryId,
                           @RequestBody Rule rule) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        rule.setCategory(category);
        return ruleRepository.save(rule);
    }

     
    @PutMapping("/{id}")
    public Rule updateRule(@PathVariable Long id,
                           @RequestBody Rule updated) {

        Rule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));

        rule.setTitle(updated.getTitle());
        rule.setDescription(updated.getDescription());

        return ruleRepository.save(rule);
    }

    
    @DeleteMapping("/{id}")
    public String deleteRule(@PathVariable Long id) {
        ruleRepository.deleteById(id);
        return "Rule deleted successfully";
    }
    
    @GetMapping("/search")
    public List<Rule> searchRules(@RequestParam String q) {
        return ruleService.searchRules(q);
    }
    
    
}