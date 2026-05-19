package com.college.protocolapp.model;

 


 
import jakarta.persistence.Entity;
 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
 
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
 
import lombok.NoArgsConstructor;
 

@Entity
 @Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "labs")
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
}