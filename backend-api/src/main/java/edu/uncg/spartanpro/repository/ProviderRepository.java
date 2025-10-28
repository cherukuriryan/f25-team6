package edu.uncg.spartanpro.repository;

import edu.uncg.spartanpro.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<Provider, Long> {}