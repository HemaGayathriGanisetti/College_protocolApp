 package com.college.protocolapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.college.protocolapp.model.Timetable;
import com.college.protocolapp.model.Day;
import com.college.protocolapp.service.TimetableService;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin
public class TimetableController {

    private final TimetableService service;

    public TimetableController(TimetableService service) {
        this.service = service;
    }

     
    @GetMapping
    public List<Timetable> getAll() {
        return service.getAll();
    }

     
    @PostMapping
    public Timetable create(@RequestBody Timetable t) {
        return service.save(t);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

     
    @PutMapping("/{id}")
    public Timetable update(@PathVariable Long id, @RequestBody Timetable t) {
        return service.update(id, t);
    }

     
    @GetMapping("/day/{day}")
    public List<Timetable> getByDay(@PathVariable Day day) {
        return service.getByDay(day);
    }

     
    @GetMapping("/weekly")
    public List<Timetable> getWeekly() {
        return service.getWeekly();
    }
}