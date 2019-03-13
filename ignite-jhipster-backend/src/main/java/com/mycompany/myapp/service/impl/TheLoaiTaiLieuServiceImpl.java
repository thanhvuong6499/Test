package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TheLoaiTaiLieuService;
import com.mycompany.myapp.domain.TheLoaiTaiLieu;
import com.mycompany.myapp.repository.TheLoaiTaiLieuRepository;
import com.mycompany.myapp.repository.search.TheLoaiTaiLieuSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TheLoaiTaiLieu.
 */
@Service
@Transactional
public class TheLoaiTaiLieuServiceImpl implements TheLoaiTaiLieuService {

    private final Logger log = LoggerFactory.getLogger(TheLoaiTaiLieuServiceImpl.class);

    private final TheLoaiTaiLieuRepository theLoaiTaiLieuRepository;

    private final TheLoaiTaiLieuSearchRepository theLoaiTaiLieuSearchRepository;

    public TheLoaiTaiLieuServiceImpl(TheLoaiTaiLieuRepository theLoaiTaiLieuRepository, TheLoaiTaiLieuSearchRepository theLoaiTaiLieuSearchRepository) {
        this.theLoaiTaiLieuRepository = theLoaiTaiLieuRepository;
        this.theLoaiTaiLieuSearchRepository = theLoaiTaiLieuSearchRepository;
    }

    /**
     * Save a theLoaiTaiLieu.
     *
     * @param theLoaiTaiLieu the entity to save
     * @return the persisted entity
     */
    @Override
    public TheLoaiTaiLieu save(TheLoaiTaiLieu theLoaiTaiLieu) {
        log.debug("Request to save TheLoaiTaiLieu : {}", theLoaiTaiLieu);        TheLoaiTaiLieu result = theLoaiTaiLieuRepository.save(theLoaiTaiLieu);
        theLoaiTaiLieuSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the theLoaiTaiLieus.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiTaiLieu> findAll() {
        log.debug("Request to get all TheLoaiTaiLieus");
        return theLoaiTaiLieuRepository.findAll();
    }


    /**
     * Get one theLoaiTaiLieu by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TheLoaiTaiLieu> findOne(Long id) {
        log.debug("Request to get TheLoaiTaiLieu : {}", id);
        return theLoaiTaiLieuRepository.findById(id);
    }

    /**
     * Delete the theLoaiTaiLieu by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TheLoaiTaiLieu : {}", id);
        theLoaiTaiLieuRepository.deleteById(id);
        theLoaiTaiLieuSearchRepository.deleteById(id);
    }

    /**
     * Search for the theLoaiTaiLieu corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiTaiLieu> search(String query) {
        log.debug("Request to search TheLoaiTaiLieus for query {}", query);
        return StreamSupport
            .stream(theLoaiTaiLieuSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
