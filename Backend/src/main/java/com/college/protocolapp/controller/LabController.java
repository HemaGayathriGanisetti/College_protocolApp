package com.college.protocolapp.controller;

import com.college.protocolapp.model.Lab;
import com.college.protocolapp.service.LabService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labs")  
public class LabController {

    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

     
    @GetMapping
    public List<Lab> getAllLabs() {
        return labService.getAllLabs();
    }

     
    @GetMapping("/{id}")
    public Lab getLabById(@PathVariable Long id) {
        return labService.getLabById(id);
    }

    
    @PostMapping
    public Lab createLab(@RequestBody Lab lab) {
        return labService.addLab(lab);
    }
    
    @PutMapping("/{id}")
    public Lab updateLab(@PathVariable Long id, @RequestBody Lab lab) {
        return labService.updateLab(id, lab);
    }


     
    @DeleteMapping("/{id}")
    public String deleteLab(@PathVariable Long id) {
        labService.deleteLab(id);
        return "Lab deleted successfully";
    }
}