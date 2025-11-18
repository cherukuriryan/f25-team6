package edu.uncg.spartanpro.auth;

import edu.uncg.spartanpro.student.Student;
import edu.uncg.spartanpro.student.StudentRepository;

import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class LoginController 
{

    private final StudentRepository repo;

    public LoginController(StudentRepository repo)
     {
        this.repo = repo;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) 
    {

        Optional<Student> match = repo.findAll().stream()
            .filter(s -> s.getEmail().equals(req.getEmail()) &&
                         s.getPassword().equals(req.getPassword()))
            .findFirst();

        if (match.isEmpty())
         {
            throw new RuntimeException("Invalid email or password.");
        }

        Student s = match.get();
        return new LoginResponse(s.getId(), s.getName(), s.getEmail());
    }
}
