package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Provider;
import edu.uncg.spartanpro.service.ProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/providers")
public class ProviderController {

    private final ProviderService service;

    public ProviderController(ProviderService service) {
        this.service = service;
    }

    // Create a new provider
    @PostMapping
    public ResponseEntity<Provider> create(@RequestBody Provider provider) {
        Provider created = service.create(provider);
        return ResponseEntity.ok(created);
    }

    // Get all providers
    @GetMapping
    public ResponseEntity<List<Provider>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // Get provider by ID
    @GetMapping("/{id}")
    public ResponseEntity<Provider> getById(@PathVariable Long id) {
        Provider provider = service.getById(id);
        return ResponseEntity.ok(provider);
    }

    // Update provider by ID
    @PutMapping("/{id}")
    public ResponseEntity<Provider> update(@PathVariable Long id, @RequestBody Provider provider) {
        Provider updated = service.update(id, provider);
        return ResponseEntity.ok(updated);
    }

    // Delete provider by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Provider deleted.");
    }
}
