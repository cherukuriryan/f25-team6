package edu.uncg.spartanpro.service;

import edu.uncg.spartanpro.entity.TutorService;
import edu.uncg.spartanpro.entity.Provider;
import edu.uncg.spartanpro.repository.TutorServiceRepository;
import edu.uncg.spartanpro.repository.ProviderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TutorServiceService {

    private final TutorServiceRepository serviceRepo;
    private final ProviderRepository providerRepo;

    public TutorServiceService(TutorServiceRepository serviceRepo, ProviderRepository providerRepo) {
        this.serviceRepo = serviceRepo;
        this.providerRepo = providerRepo;
    }

    public TutorService createService(Long providerId, TutorService service) {
        Provider provider = providerRepo.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        service.setProvider(provider);
        return serviceRepo.save(service);
    }

    public List<TutorService> getServicesByProvider(Long providerId) {
        return serviceRepo.findByProviderId(providerId);
    }
}