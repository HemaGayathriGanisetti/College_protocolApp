 package com.college.protocolapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.college.protocolapp.model.Timetable;
import com.college.protocolapp.model.Day;
import com.college.protocolapp.repository.TimetableRepository;

@Service
public class TimetableService {

    private final TimetableRepository repo;

    public TimetableService(TimetableRepository repo) {
        this.repo = repo;
    }

    /* ========================
       GET ALL
    ======================== */
    public List<Timetable> getAll() {
        return repo.findAll();
    }

    /* ========================
       CREATE
    ======================== */
    public Timetable save(Timetable t) {
        return repo.save(t);
    }

    /* ========================
       DELETE
    ======================== */
    public void delete(Long id) {
        repo.deleteById(id);
    }

    /* ========================
       UPDATE
    ======================== */
    public Timetable update(Long id, Timetable newData) {
        Timetable existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable not found"));

        existing.setDay(newData.getDay());
        existing.setPeriod(newData.getPeriod());
        existing.setSubject(newData.getSubject());
        existing.setFaculty(newData.getFaculty());
        existing.setRoom(newData.getRoom());

        return repo.save(existing);
    }

    /* ========================
       FILTER BY DAY
    ======================== */
    public List<Timetable> getByDay(Day day) {
        return repo.findByDay(day);
    }

    /* ========================
       WEEKLY TIMETABLE (FOR GRID UI)
    ======================== */
    public List<Timetable> getWeekly() {
        return repo.findAllByOrderByDayAscPeriodAsc();
    }
}