package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TheLoaiTieuChi;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TheLoaiTieuChi.
 */
public interface TheLoaiTieuChiService {

    /**
     * Save a theLoaiTieuChi.
     *
     * @param theLoaiTieuChi the entity to save
     * @return the persisted entity
     */
    TheLoaiTieuChi save(TheLoaiTieuChi theLoaiTieuChi);

    /**
     * Get all the theLoaiTieuChis.
     *
     * @return the list of entities
     */
    List<TheLoaiTieuChi> findAll();


    /**
     * Get the "id" theLoaiTieuChi.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TheLoaiTieuChi> findOne(Long id);

    /**
     * Delete the "id" theLoaiTieuChi.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the theLoaiTieuChi corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TheLoaiTieuChi> search(String query);
}
