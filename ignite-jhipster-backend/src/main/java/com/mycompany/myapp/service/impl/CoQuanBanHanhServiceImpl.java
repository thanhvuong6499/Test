package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CoQuanBanHanhService;
import com.mycompany.myapp.domain.CoQuanBanHanh;
import com.mycompany.myapp.repository.CoQuanBanHanhRepository;
import com.mycompany.myapp.repository.search.CoQuanBanHanhSearchRepository;
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
 * Service Implementation for managing CoQuanBanHanh.
 */
@Service
@Transactional
public class CoQuanBanHanhServiceImpl implements CoQuanBanHanhService {

    private final Logger log = LoggerFactory.getLogger(CoQuanBanHanhServiceImpl.class);

    private final CoQuanBanHanhRepository coQuanBanHanhRepository;

    private final CoQuanBanHanhSearchRepository coQuanBanHanhSearchRepository;

    public CoQuanBanHanhServiceImpl(CoQuanBanHanhRepository coQuanBanHanhRepository, CoQuanBanHanhSearchRepository coQuanBanHanhSearchRepository) {
        this.coQuanBanHanhRepository = coQuanBanHanhRepository;
        this.coQuanBanHanhSearchRepository = coQuanBanHanhSearchRepository;
    }

    /**
     * Save a coQuanBanHanh.
     *
     * @param coQuanBanHanh the entity to save
     * @return the persisted entity
     */
    @Override
    public CoQuanBanHanh save(CoQuanBanHanh coQuanBanHanh) {
        log.debug("Request to save CoQuanBanHanh : {}", coQuanBanHanh);        CoQuanBanHanh result = coQuanBanHanhRepository.save(coQuanBanHanh);
        coQuanBanHanhSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the coQuanBanHanhs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CoQuanBanHanh> findAll() {
        log.debug("Request to get all CoQuanBanHanhs");
        return coQuanBanHanhRepository.findAll();
    }


    /**
     * Get one coQuanBanHanh by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CoQuanBanHanh> findOne(Long id) {
        log.debug("Request to get CoQuanBanHanh : {}", id);
        return coQuanBanHanhRepository.findById(id);
    }

    /**
     * Delete the coQuanBanHanh by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CoQuanBanHanh : {}", id);
        coQuanBanHanhRepository.deleteById(id);
        coQuanBanHanhSearchRepository.deleteById(id);
    }

    /**
     * Search for the coQuanBanHanh corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CoQuanBanHanh> search(String query) {
        log.debug("Request to search CoQuanBanHanhs for query {}", query);
        return StreamSupport
            .stream(coQuanBanHanhSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
