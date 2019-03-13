package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.BanDanhGia;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing BanDanhGia.
 */
public interface BanDanhGiaService {

    /**
     * Save a banDanhGia.
     *
     * @param banDanhGia the entity to save
     * @return the persisted entity
     */
    BanDanhGia save(BanDanhGia banDanhGia);

    /**
     * Get all the banDanhGias.
     *
     * @return the list of entities
     */
    List<BanDanhGia> findAll();


    /**
     * Get the "id" banDanhGia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BanDanhGia> findOne(Long id);

    /**
     * Delete the "id" banDanhGia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the banDanhGia corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<BanDanhGia> search(String query);
}
