package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CauTraLoi;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CauTraLoi.
 */
public interface CauTraLoiService {

    /**
     * Save a cauTraLoi.
     *
     * @param cauTraLoi the entity to save
     * @return the persisted entity
     */
    CauTraLoi save(CauTraLoi cauTraLoi);

    /**
     * Get all the cauTraLois.
     *
     * @return the list of entities
     */
    List<CauTraLoi> findAll();


    /**
     * Get the "id" cauTraLoi.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CauTraLoi> findOne(Long id);

    /**
     * Delete the "id" cauTraLoi.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the cauTraLoi corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CauTraLoi> search(String query);
}
