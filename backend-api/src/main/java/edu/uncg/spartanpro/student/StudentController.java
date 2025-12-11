package edu.uncg.spartanpro.student;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@RequestBody Student s) {
        return repo.save(s);
    }

    @GetMapping
    public List<Student> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Student get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student u) {

        Student s = repo.findById(id).orElseThrow();

        if (u.getName() != null) s.setName(u.getName());
        if (u.getEmail() != null) s.setEmail(u.getEmail());
        if (u.getPassword() != null) s.setPassword(u.getPassword());
        if (u.getSubjects() != null) s.setSubjects(u.getSubjects());
        if (u.getProfilePic() != null) s.setProfilePic(u.getProfilePic());

        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
