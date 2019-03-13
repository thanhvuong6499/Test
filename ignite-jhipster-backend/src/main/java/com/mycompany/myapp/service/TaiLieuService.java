package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TaiLieu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TaiLieu.
 */
public interface TaiLieuService {

    /**
     * Save a taiLieu.
     *
     * @param taiLieu the entity to save
     * @return the persisted entity
     */
    TaiLieu save(TaiLieu taiLieu);

    /**
     * Get all the taiLieus.
     *
     * @return the list of entities
     */
    List<TaiLieu> findAll();

    /**
     * Get all the TaiLieu with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<TaiLieu> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" taiLieu.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TaiLieu> findOne(Long id);

    /**
     * Delete the "id" taiLieu.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the taiLieu corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TaiLieu> search(String query);
}
