package com.college.protocolapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.protocolapp.dto.SearchResponse;
import com.college.protocolapp.model.Lab;
import com.college.protocolapp.model.Rule;
import com.college.protocolapp.model.SearchType;
import com.college.protocolapp.model.Timetable;
import com.college.protocolapp.repository.LabRepository;
import com.college.protocolapp.repository.RuleRepository;
import com.college.protocolapp.repository.TimetableRepository;

@Service
public class SearchService {

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private TimetableRepository timetableRepository;

    public List<SearchResponse> globalSearch(String keyword) {

        List<SearchResponse> result = new ArrayList<>();

        // 🔍 RULES
        List<Rule> rules =
                ruleRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword,keyword);

        for (Rule r : rules) {
            result.add(new SearchResponse(
                    r.getId(),
                    r.getTitle(),
                    SearchType.RULE
            ));
        }

        // 🔍 LABS
        List<Lab> labs = labRepository.findByNameContainingIgnoreCase(keyword);

        for (Lab l : labs) {
            result.add(new SearchResponse(
                    l.getId(),
                    l.getName(),
                    SearchType.LAB
            ));
        }

        // 🔍 TIMETABLE
        List<Timetable> times = timetableRepository.findBySubjectContainingIgnoreCase(keyword);

        for (Timetable t : times) {
            result.add(new SearchResponse(
                    t.getId(),
                    t.getSubject(),
                    SearchType.TIMETABLE
            ));
        }

        return result;
    }
}