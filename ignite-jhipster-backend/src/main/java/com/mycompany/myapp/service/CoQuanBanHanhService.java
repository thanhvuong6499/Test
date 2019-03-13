package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CoQuanBanHanh;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CoQuanBanHanh.
 */
public interface CoQuanBanHanhService {

    /**
     * Save a coQuanBanHanh.
     *
     * @param coQuanBanHanh the entity to save
     * @return the persisted entity
     */
    CoQuanBanHanh save(CoQuanBanHanh coQuanBanHanh);

    /**
     * Get all the coQuanBanHanhs.
     *
     * @return the list of entities
     */
    List<CoQuanBanHanh> findAll();


    /**
     * Get the "id" coQuanBanHanh.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CoQuanBanHanh> findOne(Long id);

    /**
     * Delete the "id" coQuanBanHanh.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the coQuanBanHanh corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CoQuanBanHanh> search(String query);
}
