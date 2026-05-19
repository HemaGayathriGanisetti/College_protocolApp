 package com.college.protocolapp.service;

import com.college.protocolapp.dto.StudentRequest;
import com.college.protocolapp.dto.StudentResponse;
import com.college.protocolapp.dto.UserResponse;
import com.college.protocolapp.model.Student;
import com.college.protocolapp.model.User;
import com.college.protocolapp.repository.StudentRepository;
import com.college.protocolapp.repository.UserRepository;
import com.college.protocolapp.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtService jwtService;
    public StudentResponse addStudent(StudentRequest request, String token) {

        String jwt = token.replace("Bearer ", "");
        String email = jwtService.extractEmail(jwt);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = new Student();
        student.setName(request.getName());
        student.setDepartment(request.getDepartment());
        student.setUser(user);

        Student saved = studentRepo.save(student);

        return mapToResponse(saved);
    }

    public List<StudentResponse> getAll() {
        return studentRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public void deleteStudent(Long id) {

        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepo.delete(student);
    }
    
    private StudentResponse mapToResponse(Student student) {

        UserResponse userDto = new UserResponse(
                student.getUser().getId(),
                student.getUser().getName(),
                student.getUser().getEmail(),
                student.getUser().getRole().name()
        );

        return new StudentResponse(
                student.getId(),
                student.getName(),
                student.getDepartment(),
                userDto
        );
}
}
