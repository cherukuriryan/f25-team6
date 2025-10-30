package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Review;
import edu.uncg.spartanpro.repository.ReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewRepository repo;

    public ReviewController(ReviewRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Review create(@RequestBody Review r) {
      
        if (r.getRating() < 1 || r.getRating() > 5) {
            throw new IllegalArgumentException("rating must be 1..5");
        }
        return repo.save(r);
    }

    @GetMapping
    public List<Review> list(@RequestParam(required = false) Long providerId) {
        if (providerId != null) {
            return repo.findByProviderId(providerId);
        }
        return repo.findAll();
    }
}
