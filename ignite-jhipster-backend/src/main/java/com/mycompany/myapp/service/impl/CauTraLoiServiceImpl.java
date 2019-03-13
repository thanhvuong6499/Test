package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CauTraLoiService;
import com.mycompany.myapp.domain.CauTraLoi;
import com.mycompany.myapp.repository.CauTraLoiRepository;
import com.mycompany.myapp.repository.search.CauTraLoiSearchRepository;
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
 * Service Implementation for managing CauTraLoi.
 */
@Service
@Transactional
public class CauTraLoiServiceImpl implements CauTraLoiService {

    private final Logger log = LoggerFactory.getLogger(CauTraLoiServiceImpl.class);

    private final CauTraLoiRepository cauTraLoiRepository;

    private final CauTraLoiSearchRepository cauTraLoiSearchRepository;

    public CauTraLoiServiceImpl(CauTraLoiRepository cauTraLoiRepository, CauTraLoiSearchRepository cauTraLoiSearchRepository) {
        this.cauTraLoiRepository = cauTraLoiRepository;
        this.cauTraLoiSearchRepository = cauTraLoiSearchRepository;
    }

    /**
     * Save a cauTraLoi.
     *
     * @param cauTraLoi the entity to save
     * @return the persisted entity
     */
    @Override
    public CauTraLoi save(CauTraLoi cauTraLoi) {
        log.debug("Request to save CauTraLoi : {}", cauTraLoi);        CauTraLoi result = cauTraLoiRepository.save(cauTraLoi);
        cauTraLoiSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the cauTraLois.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CauTraLoi> findAll() {
        log.debug("Request to get all CauTraLois");
        return cauTraLoiRepository.findAll();
    }


    /**
     * Get one cauTraLoi by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CauTraLoi> findOne(Long id) {
        log.debug("Request to get CauTraLoi : {}", id);
        return cauTraLoiRepository.findById(id);
    }

    /**
     * Delete the cauTraLoi by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CauTraLoi : {}", id);
        cauTraLoiRepository.deleteById(id);
        cauTraLoiSearchRepository.deleteById(id);
    }

    /**
     * Search for the cauTraLoi corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CauTraLoi> search(String query) {
        log.debug("Request to search CauTraLois for query {}", query);
        return StreamSupport
            .stream(cauTraLoiSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
