 package com.college.protocolapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.college.protocolapp.model.Timetable;
import com.college.protocolapp.model.Day;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {

    
    List<Timetable> findBySubjectContainingIgnoreCase(String keyword);

    
    List<Timetable> findByDay(Day day);

    
    List<Timetable> findAllByOrderByDayAscPeriodAsc();
}
