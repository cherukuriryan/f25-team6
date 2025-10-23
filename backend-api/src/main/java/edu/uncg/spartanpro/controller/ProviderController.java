package edu.uncg.spartanpro.controller;

import edu.uncg.spartanpro.entity.Provider;
import edu.uncg.spartanpro.service.ProviderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/providers")
public class ProviderController {

    private final ProviderService service;

    public ProviderController(ProviderService service) {
        this.service = service;
    }

    @PostMapping
    public Provider create(@RequestBody Provider provider) { return service.create(provider); }

    @GetMapping
    public List<Provider> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Provider getById(@PathVariable Long id) { return service.getById(id); }

    @PutMapping("/{id}")
    public Provider update(@PathVariable Long id, @RequestBody Provider provider) {
        return service.update(id, provider);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Provider deleted.";
    }
}
