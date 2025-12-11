package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Provider;
import edu.uncg.spartanpro.entity.Review;
import edu.uncg.spartanpro.entity.TutorService;

import edu.uncg.spartanpro.repository.ReviewRepository;

import edu.uncg.spartanpro.service.ProviderService;
import edu.uncg.spartanpro.service.TutorServiceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/providers")
@CrossOrigin
public class ProviderController {
    private final ProviderService providerService;
    private final TutorServiceService serviceService;
    private final ReviewRepository reviewRepo;

    public ProviderController(ProviderService providerService, TutorServiceService serviceService, ReviewRepository reviewRepo) {
        this.providerService = providerService;
        this.serviceService = serviceService;
        this.reviewRepo = reviewRepo;
    }

    
    @PostMapping
    public Provider createProvider(@RequestBody Provider provider) {
        return providerService.create(provider);
    }

    @PutMapping("/{id}")
    public Provider updateProvider(@PathVariable Long id, @RequestBody Provider body) {
        return providerService.update(id, body);
    }

    @GetMapping
    public List<Provider> getAllProviders() {
        return providerService.getAll();
    }

    @GetMapping("/{id}")
    public Provider getProviderById(@PathVariable Long id) {
        return providerService.getById(id);
    }

    
    @PostMapping("/{providerId}/services")
    public TutorService createService(@PathVariable Long providerId, @RequestBody TutorService service) {
        return serviceService.createService(providerId, service);
    }

    @GetMapping("/{providerId}/services")
    public List<TutorService> getServicesByProvider(@PathVariable Long providerId) {
        return serviceService.getServicesByProvider(providerId);
    }

   
    @GetMapping("/{providerId}/stats")
public ResponseEntity<?> getProviderStats(@PathVariable Long providerId) {
    List<TutorService> services = serviceService.getServicesByProvider(providerId);
    List<Review> reviews = reviewRepo.findByProviderId(providerId);

    int totalSessions = services.stream().mapToInt(TutorService::getCompletedSessions).sum();
    int totalServices = services.size();
    int totalReviews = reviews.size();
    double avgRating = reviews.isEmpty() ? 0.0 :
        reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);

    String stats = String.format(
        "Total Services: %d | Total Sessions: %d | Total Reviews: %d | Average Rating: %.1f",
        totalServices, totalSessions, totalReviews, avgRating
    );

    return ResponseEntity.ok(stats);
}

    @GetMapping("/{providerId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByProvider(@PathVariable Long providerId) {
        List<Review> reviews = reviewRepo.findByProviderId(providerId);
        if (reviews.isEmpty()) return ResponseEntity.ok(Collections.emptyList());
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{providerId}/reviews/{reviewId}/reply")
    public Review replyToReview(@PathVariable Long providerId, @PathVariable Long reviewId, @RequestBody Review body) {
        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        if (review.getProvider() != null && !review.getProvider().getId().equals(providerId))
            throw new RuntimeException("Review does not belong to this provider");

        review.setProviderReply(body.getProviderReply());
        review.setReplyDate(LocalDateTime.now());
        return reviewRepo.save(review);
    }
}