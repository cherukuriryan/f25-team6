package edu.uncg.spartanpro.repository;

import edu.uncg.spartanpro.entity.TutorService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TutorServiceRepository extends JpaRepository<TutorService, Long> {


    List<TutorService> findByProvider_Id(Long providerId);
}
