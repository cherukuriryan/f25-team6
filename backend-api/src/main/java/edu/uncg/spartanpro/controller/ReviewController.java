package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Review;
import edu.uncg.spartanpro.repository.ReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "rating must be 1..5");
        }
        if (r.getProvider() == null || r.getProvider().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "provider is required");
        }
        if (r.getStudent() == null || r.getStudent().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "student is required");
        }
        if (r.getCreatedAt() == null) {
            r.setCreatedAt(LocalDateTime.now());
        }
        return repo.save(r);
    }

    @GetMapping
    public List<Review> list(@RequestParam(required = false) Long providerId) {
        if (providerId != null) {
            return repo.findByProvider_Id(providerId);
        }
        return repo.findAll();
    }

    @PutMapping("/{id}/reply")
    public Review reply(@PathVariable Long id, @RequestBody String replyText) {
        Review r = repo.findById(id).orElseThrow();
        r.setProviderReply(replyText);
        r.setReplyDate(LocalDateTime.now());
        return repo.save(r);
    }
}
