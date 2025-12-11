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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/providers")
@CrossOrigin
public class ProviderController {

    private final ProviderService providerService;
    private final TutorServiceService tutorServiceService;
    private final ReviewRepository reviewRepo;

    public ProviderController(
            ProviderService providerService,
            TutorServiceService tutorServiceService,
            ReviewRepository reviewRepo) {

        this.providerService = providerService;
        this.tutorServiceService = tutorServiceService;
        this.reviewRepo = reviewRepo;
    }

    @PostMapping
    public Provider create(@RequestBody Provider provider) {
        return providerService.create(provider);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Provider provider = providerService.login(body.get("email"), body.get("password"));
            return ResponseEntity.ok(provider);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PutMapping("/{id}")
    public Provider update(@PathVariable Long id, @RequestBody Provider provider) {
        return providerService.update(id, provider);
    }

    @GetMapping
    public List<Provider> getAll() {
        return providerService.getAll();
    }

    @GetMapping("/{id}")
    public Provider getById(@PathVariable Long id) {
        return providerService.getById(id);
    }

    // -------------------------
    // SERVICES
    // -------------------------
    @PostMapping("/{providerId}/services")
    public TutorService createService(@PathVariable Long providerId, @RequestBody TutorService svc) {
        return tutorServiceService.createService(providerId, svc);
    }

    @GetMapping("/{providerId}/services")
    public List<TutorService> getServices(@PathVariable Long providerId) {
        return tutorServiceService.getServicesByProvider(providerId);
    }

    // -------------------------
    // STATS
    // -------------------------
    @GetMapping("/{providerId}/stats")
    public String stats(@PathVariable Long providerId) {

        List<TutorService> services = tutorServiceService.getServicesByProvider(providerId);

        
        List<Review> reviews = reviewRepo.findByProvider_Id(providerId);

        int totalServices = services.size();
        int totalSessions = services.stream().mapToInt(TutorService::getCompletedSessions).sum();
        double avgRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);

        return "Services: " + totalServices +
                " | Sessions: " + totalSessions +
                " | Avg Rating: " + avgRating;
    }

    // -------------------------
    // REVIEWS
    // -------------------------
    @GetMapping("/{providerId}/reviews")
    public List<Review> reviews(@PathVariable Long providerId) {
        
        return reviewRepo.findByProvider_Id(providerId);
    }

    @PostMapping("/{providerId}/reviews/{reviewId}/reply")
    public Review reply(
            @PathVariable Long providerId,
            @PathVariable Long reviewId,
            @RequestBody Map<String, String> body) {

        Review r = reviewRepo.findById(reviewId).orElseThrow();
        r.setProviderReply(body.get("reply"));
        r.setReplyDate(LocalDateTime.now());
        return reviewRepo.save(r);
    }
}
