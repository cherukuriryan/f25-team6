package edu.uncg.spartanpro.review;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController
 {
    private final ReviewRepository repo;
    public ReviewController(ReviewRepository repo) 
    { this.repo = repo; }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Review create(@RequestBody Review r)
     {
        if (r.getBookingId()==null || r.getStudentId()==null || r.getProviderId()==null)
            throw new IllegalArgumentException("bookingId, studentId, providerId are required");
        if (r.getRating() < 1 || r.getRating() > 5)
            throw new IllegalArgumentException("rating must be 1..5");
        return repo.save(r);
    }

    @GetMapping
    public List<Review> list(@RequestParam(required=false) Long providerId,
    @RequestParam(required=false) Long studentId,
    @RequestParam(required=false) Long bookingId) 
    {
        if (providerId != null) return repo.findByProviderId(providerId);
        if (studentId  != null) return repo.findByStudentId(studentId);
        if (bookingId  != null) return repo.findByBookingId(bookingId);
        return repo.findAll();
    }
}
