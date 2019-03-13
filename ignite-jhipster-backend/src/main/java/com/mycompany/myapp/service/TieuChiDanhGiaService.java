package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TieuChiDanhGia;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TieuChiDanhGia.
 */
public interface TieuChiDanhGiaService {

    /**
     * Save a tieuChiDanhGia.
     *
     * @param tieuChiDanhGia the entity to save
     * @return the persisted entity
     */
    TieuChiDanhGia save(TieuChiDanhGia tieuChiDanhGia);

    /**
     * Get all the tieuChiDanhGias.
     *
     * @return the list of entities
     */
    List<TieuChiDanhGia> findAll();


    /**
     * Get the "id" tieuChiDanhGia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TieuChiDanhGia> findOne(Long id);

    /**
     * Delete the "id" tieuChiDanhGia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tieuChiDanhGia corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TieuChiDanhGia> search(String query);
}
