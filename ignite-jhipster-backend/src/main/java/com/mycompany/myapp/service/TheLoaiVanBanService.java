package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TheLoaiVanBan;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TheLoaiVanBan.
 */
public interface TheLoaiVanBanService {

    /**
     * Save a theLoaiVanBan.
     *
     * @param theLoaiVanBan the entity to save
     * @return the persisted entity
     */
    TheLoaiVanBan save(TheLoaiVanBan theLoaiVanBan);

    /**
     * Get all the theLoaiVanBans.
     *
     * @return the list of entities
     */
    List<TheLoaiVanBan> findAll();


    /**
     * Get the "id" theLoaiVanBan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TheLoaiVanBan> findOne(Long id);

    /**
     * Delete the "id" theLoaiVanBan.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the theLoaiVanBan corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TheLoaiVanBan> search(String query);
}
