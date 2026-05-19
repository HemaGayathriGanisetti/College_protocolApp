package com.college.protocolapp.dto;
 
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {

    private Long id;
    private String name;
    private String department;

    private UserResponse user;
}