package edu.uncg.spartanpro.service;

import edu.uncg.spartanpro.entity.Provider;
import edu.uncg.spartanpro.repository.ProviderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProviderService {
    private final ProviderRepository repo;

    public ProviderService(ProviderRepository repo) {
        this.repo = repo;
    }

    public Provider create(Provider p) { return repo.save(p); }

    public List<Provider> getAll() { return repo.findAll(); }

    public Provider getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
    }

    public Provider update(Long id, Provider updated) {
        Provider existing = getById(id);
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setBio(updated.getBio());
        existing.setSubjects(updated.getSubjects());
        return repo.save(existing);
    }

    public void delete(Long id) { repo.deleteById(id); }
}