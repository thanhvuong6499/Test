package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TheLoaiTaiLieu;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TheLoaiTaiLieu.
 */
public interface TheLoaiTaiLieuService {

    /**
     * Save a theLoaiTaiLieu.
     *
     * @param theLoaiTaiLieu the entity to save
     * @return the persisted entity
     */
    TheLoaiTaiLieu save(TheLoaiTaiLieu theLoaiTaiLieu);

    /**
     * Get all the theLoaiTaiLieus.
     *
     * @return the list of entities
     */
    List<TheLoaiTaiLieu> findAll();


    /**
     * Get the "id" theLoaiTaiLieu.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TheLoaiTaiLieu> findOne(Long id);

    /**
     * Delete the "id" theLoaiTaiLieu.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the theLoaiTaiLieu corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TheLoaiTaiLieu> search(String query);
}
