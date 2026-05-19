 package com.college.protocolapp.service;

import com.college.protocolapp.model.Category;
import com.college.protocolapp.model.Lab;
import com.college.protocolapp.repository.CategoryRepository;
import com.college.protocolapp.repository.LabRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabService {

    private final LabRepository labRepository;
    private final CategoryRepository categoryRepository;

    public LabService(LabRepository labRepository,
                      CategoryRepository categoryRepository) {
        this.labRepository = labRepository;
        this.categoryRepository = categoryRepository;
    }

    // ✅ GET ALL LABS
    public List<Lab> getAllLabs() {
        return labRepository.findAll();
    }

    // ✅ GET LAB BY ID
    public Lab getLabById(Long id) {
        return labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab not found"));
    }

    // ✅ CREATE LAB (ONLY CATEGORY + BASIC DETAILS)
    public Lab addLab(Lab lab) {

        if (lab.getCategory() != null && lab.getCategory().getId() != null) {

            Category category = categoryRepository.findById(lab.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            lab.setCategory(category);
        }

        return labRepository.save(lab);
    }

    // ✅ UPDATE LAB (NO RULES)
    public Lab updateLab(Long id, Lab updatedLab) {

        Lab existingLab = labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab not found"));

        existingLab.setName(updatedLab.getName());
        existingLab.setDescription(updatedLab.getDescription());

        if (updatedLab.getCategory() != null && updatedLab.getCategory().getId() != null) {

            Category category = categoryRepository.findById(updatedLab.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            existingLab.setCategory(category);
        }

        return labRepository.save(existingLab);
    }

    // ✅ DELETE LAB
    public void deleteLab(Long id) {
        labRepository.deleteById(id);
    }
}