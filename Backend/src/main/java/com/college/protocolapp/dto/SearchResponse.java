 
 package com.college.protocolapp.dto;

import com.college.protocolapp.model.SearchType;

public class SearchResponse {

    private Long id;
    private String title;
    private SearchType type;

    
    public SearchResponse() {
    }

     
    public SearchResponse(Long id, String title, SearchType type) {
        this.id = id;
        this.title = title;
        this.type = type;
    }

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SearchType getType() {
        return type;
    }

    public void setType(SearchType type) {
        this.type = type;
    }
}