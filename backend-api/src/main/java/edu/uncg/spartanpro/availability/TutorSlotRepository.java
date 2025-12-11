package edu.uncg.spartanpro.availability;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TutorSlotRepository extends JpaRepository<TutorSlot, Long> {
    List<TutorSlot> findByProviderId(Long providerId);
    List<TutorSlot> findByProviderIdAndBookedFalse(Long providerId);
}
