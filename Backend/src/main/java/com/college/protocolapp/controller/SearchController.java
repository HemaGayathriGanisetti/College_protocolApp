package com.college.protocolapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.college.protocolapp.dto.SearchResponse;
import com.college.protocolapp.service.SearchService;

@RestController
@RequestMapping("/api/search")
@CrossOrigin
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public List<SearchResponse> search(@RequestParam String keyword) {
        return searchService.globalSearch(keyword);
    }
}
