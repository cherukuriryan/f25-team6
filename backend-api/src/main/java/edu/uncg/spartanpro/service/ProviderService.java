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

    public Provider create(Provider p) {
        return repo.save(p);
    }

    public List<Provider> getAll() {
        return repo.findAll();
    }

    public Provider getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
    }

    public Provider login(String email, String password) {
        Provider provider = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (!provider.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return provider;
    }

    public Provider update(Long id, Provider updated) {
        Provider p = getById(id);

        p.setName(updated.getName());
        p.setEmail(updated.getEmail());
        p.setBio(updated.getBio());
        p.setSubjects(updated.getSubjects());

        
        p.setProfilePic(updated.getProfilePic());

        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            p.setPassword(updated.getPassword());
        }

        return repo.save(p);
    }
}
