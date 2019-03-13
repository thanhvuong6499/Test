package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.VanBan;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing VanBan.
 */
public interface VanBanService {

    /**
     * Save a vanBan.
     *
     * @param vanBan the entity to save
     * @return the persisted entity
     */
    VanBan save(VanBan vanBan);

    /**
     * Get all the vanBans.
     *
     * @return the list of entities
     */
    List<VanBan> findAll();


    /**
     * Get the "id" vanBan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VanBan> findOne(Long id);

    /**
     * Delete the "id" vanBan.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the vanBan corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<VanBan> search(String query);
}
