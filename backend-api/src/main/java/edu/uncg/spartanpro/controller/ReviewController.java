package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Review;
import edu.uncg.spartanpro.repository.ReviewRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewRepository reviewRepo;

    public ReviewController(ReviewRepository reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewRepo.save(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }
}