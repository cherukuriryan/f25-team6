package edu.uncg.spartanpro.booking;

import edu.uncg.spartanpro.availability.TutorSlot;
import edu.uncg.spartanpro.availability.TutorSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private TutorSlotRepository slotRepo;  

   
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        // Mark slot as booked
        TutorSlot slot = slotRepo.findById(booking.getSlotId()).orElse(null);
        if (slot != null) {
            slot.setBooked(true);
            slotRepo.save(slot);

            
            if (booking.getProviderId() == null) {
                booking.setProviderId(slot.getProviderId());
            }
        }

        return bookingRepo.save(booking);
    }

   
    @GetMapping("/provider/{providerId}")
    public List<Booking> getBookingsByProvider(@PathVariable Long providerId) {
        return bookingRepo.findByProviderId(providerId);
    }

    /* =========================
       GET BOOKINGS FOR STUDENT
    ========================== */
    @GetMapping("/student/{studentId}")
    public List<Booking> getBookingsByStudent(@PathVariable Long studentId) {
        return bookingRepo.findByStudentId(studentId);
    }

    /* =========================
       GET A SINGLE BOOKING
    ========================== */
    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingRepo.findById(id).orElse(null);
    }

    /* =========================
       UPDATE BOOKING STATUS
    ========================== */
    @PatchMapping("/{id}")
    public Booking updateBookingStatus(
            @PathVariable Long id,
            @RequestBody String status
    ) {
        Booking b = bookingRepo.findById(id).orElse(null);
        if (b == null) return null;

        b.setStatus(status.replace("\"", ""));
        return bookingRepo.save(b);
    }
}
