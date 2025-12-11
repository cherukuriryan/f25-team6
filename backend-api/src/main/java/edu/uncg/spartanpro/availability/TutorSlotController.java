package edu.uncg.spartanpro.availability;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin
public class TutorSlotController {

    private final TutorSlotRepository repo;

    public TutorSlotController(TutorSlotRepository repo) {
        this.repo = repo;
    }

    
    @PostMapping("/provider/{providerId}")
    public TutorSlot addSlot(
            @PathVariable Long providerId,
            @RequestBody TutorSlot slot) {

        slot.setProviderId(providerId);
        return repo.save(slot);
    }

    
    @GetMapping("/provider/{providerId}")
    public List<TutorSlot> getSlots(@PathVariable Long providerId) {
        return repo.findByProviderId(providerId);
    }

    
    @GetMapping("/provider/{providerId}/open")
    public List<TutorSlot> getOpenSlots(@PathVariable Long providerId) {
        return repo.findByProviderIdAndBookedFalse(providerId);
    }

    
    @GetMapping("/id/{slotId}")
    public TutorSlot getSlotById(@PathVariable Long slotId) {
        return repo.findById(slotId).orElse(null);
    }

    
    @DeleteMapping("/id/{slotId}")
    public void deleteSlot(@PathVariable Long slotId) {
        repo.deleteById(slotId);
    }
}
