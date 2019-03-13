package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.GiaoVien;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GiaoVien.
 */
public interface GiaoVienService {

    /**
     * Save a giaoVien.
     *
     * @param giaoVien the entity to save
     * @return the persisted entity
     */
    GiaoVien save(GiaoVien giaoVien);

    /**
     * Get all the giaoViens.
     *
     * @return the list of entities
     */
    List<GiaoVien> findAll();

    /**
     * Get all the GiaoVien with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<GiaoVien> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" giaoVien.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GiaoVien> findOne(Long id);

    /**
     * Delete the "id" giaoVien.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the giaoVien corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<GiaoVien> search(String query);
}
