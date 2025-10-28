package edu.uncg.spartanpro.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "students")
public class Student
 {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @Email @NotBlank
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;

    public Long getId()
     { return id; }
    public String getName()
     { return name; }
    public void setName(String name)
     { this.name = name; }
    public String getEmail()
     { return email; }
    public void setEmail(String email)
     { this.email = email; }
    public String getPassword() 
    { return password; }
    public void setPassword(String password)
     { this.password = password; }
}
