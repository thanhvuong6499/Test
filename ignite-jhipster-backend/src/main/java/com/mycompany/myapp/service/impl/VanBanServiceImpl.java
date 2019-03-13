package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.VanBanService;
import com.mycompany.myapp.domain.VanBan;
import com.mycompany.myapp.repository.VanBanRepository;
import com.mycompany.myapp.repository.search.VanBanSearchRepository;
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
 * Service Implementation for managing VanBan.
 */
@Service
@Transactional
public class VanBanServiceImpl implements VanBanService {

    private final Logger log = LoggerFactory.getLogger(VanBanServiceImpl.class);

    private final VanBanRepository vanBanRepository;

    private final VanBanSearchRepository vanBanSearchRepository;

    public VanBanServiceImpl(VanBanRepository vanBanRepository, VanBanSearchRepository vanBanSearchRepository) {
        this.vanBanRepository = vanBanRepository;
        this.vanBanSearchRepository = vanBanSearchRepository;
    }

    /**
     * Save a vanBan.
     *
     * @param vanBan the entity to save
     * @return the persisted entity
     */
    @Override
    public VanBan save(VanBan vanBan) {
        log.debug("Request to save VanBan : {}", vanBan);        VanBan result = vanBanRepository.save(vanBan);
        vanBanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the vanBans.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VanBan> findAll() {
        log.debug("Request to get all VanBans");
        return vanBanRepository.findAll();
    }


    /**
     * Get one vanBan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VanBan> findOne(Long id) {
        log.debug("Request to get VanBan : {}", id);
        return vanBanRepository.findById(id);
    }

    /**
     * Delete the vanBan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VanBan : {}", id);
        vanBanRepository.deleteById(id);
        vanBanSearchRepository.deleteById(id);
    }

    /**
     * Search for the vanBan corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VanBan> search(String query) {
        log.debug("Request to search VanBans for query {}", query);
        return StreamSupport
            .stream(vanBanSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
