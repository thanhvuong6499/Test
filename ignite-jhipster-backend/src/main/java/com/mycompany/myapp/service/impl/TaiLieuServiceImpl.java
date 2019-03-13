package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TaiLieuService;
import com.mycompany.myapp.domain.TaiLieu;
import com.mycompany.myapp.repository.TaiLieuRepository;
import com.mycompany.myapp.repository.search.TaiLieuSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TaiLieu.
 */
@Service
@Transactional
public class TaiLieuServiceImpl implements TaiLieuService {

    private final Logger log = LoggerFactory.getLogger(TaiLieuServiceImpl.class);

    private final TaiLieuRepository taiLieuRepository;

    private final TaiLieuSearchRepository taiLieuSearchRepository;

    public TaiLieuServiceImpl(TaiLieuRepository taiLieuRepository, TaiLieuSearchRepository taiLieuSearchRepository) {
        this.taiLieuRepository = taiLieuRepository;
        this.taiLieuSearchRepository = taiLieuSearchRepository;
    }

    /**
     * Save a taiLieu.
     *
     * @param taiLieu the entity to save
     * @return the persisted entity
     */
    @Override
    public TaiLieu save(TaiLieu taiLieu) {
        log.debug("Request to save TaiLieu : {}", taiLieu);        TaiLieu result = taiLieuRepository.save(taiLieu);
        taiLieuSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the taiLieus.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TaiLieu> findAll() {
        log.debug("Request to get all TaiLieus");
        return taiLieuRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the TaiLieu with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<TaiLieu> findAllWithEagerRelationships(Pageable pageable) {
        return taiLieuRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one taiLieu by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TaiLieu> findOne(Long id) {
        log.debug("Request to get TaiLieu : {}", id);
        return taiLieuRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the taiLieu by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TaiLieu : {}", id);
        taiLieuRepository.deleteById(id);
        taiLieuSearchRepository.deleteById(id);
    }

    /**
     * Search for the taiLieu corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TaiLieu> search(String query) {
        log.debug("Request to search TaiLieus for query {}", query);
        return StreamSupport
            .stream(taiLieuSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
