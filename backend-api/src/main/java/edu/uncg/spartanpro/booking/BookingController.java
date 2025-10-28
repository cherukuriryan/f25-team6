package edu.uncg.spartanpro.booking;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController
 {
    private final BookingRepository repo;
    public BookingController(BookingRepository repo)
     { this.repo = repo; }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Booking create(@RequestBody Booking b) 
    {
        if (b.getStudentId()==null || b.getProviderId()==null || b.getSlotId()==null)
            throw new IllegalArgumentException("studentId, providerId, slotId are required");
        if (b.getStatus()==null) b.setStatus("pending");
        return repo.save(b);
    }

    @GetMapping
    public List<Booking> list(@RequestParam(required=false) Long studentId,
 @RequestParam(required=false) Long providerId)
     {
        if (studentId  != null) return repo.findByStudentId(studentId);
        if (providerId != null) return repo.findByProviderId(providerId);
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Booking get(@PathVariable Long id)
     { return repo.findById(id).orElseThrow(); }

    @PutMapping("/{id}/status")
    public Booking setStatus(@PathVariable Long id, @RequestParam String status)
     {
        Booking b = repo.findById(id).orElseThrow();
        b.setStatus(status);
        return repo.save(b);
    }

    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id)
     { repo.deleteById(id); }
}
