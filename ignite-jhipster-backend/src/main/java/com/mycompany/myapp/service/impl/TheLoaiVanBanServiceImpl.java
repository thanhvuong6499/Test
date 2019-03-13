package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TheLoaiVanBanService;
import com.mycompany.myapp.domain.TheLoaiVanBan;
import com.mycompany.myapp.repository.TheLoaiVanBanRepository;
import com.mycompany.myapp.repository.search.TheLoaiVanBanSearchRepository;
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
 * Service Implementation for managing TheLoaiVanBan.
 */
@Service
@Transactional
public class TheLoaiVanBanServiceImpl implements TheLoaiVanBanService {

    private final Logger log = LoggerFactory.getLogger(TheLoaiVanBanServiceImpl.class);

    private final TheLoaiVanBanRepository theLoaiVanBanRepository;

    private final TheLoaiVanBanSearchRepository theLoaiVanBanSearchRepository;

    public TheLoaiVanBanServiceImpl(TheLoaiVanBanRepository theLoaiVanBanRepository, TheLoaiVanBanSearchRepository theLoaiVanBanSearchRepository) {
        this.theLoaiVanBanRepository = theLoaiVanBanRepository;
        this.theLoaiVanBanSearchRepository = theLoaiVanBanSearchRepository;
    }

    /**
     * Save a theLoaiVanBan.
     *
     * @param theLoaiVanBan the entity to save
     * @return the persisted entity
     */
    @Override
    public TheLoaiVanBan save(TheLoaiVanBan theLoaiVanBan) {
        log.debug("Request to save TheLoaiVanBan : {}", theLoaiVanBan);        TheLoaiVanBan result = theLoaiVanBanRepository.save(theLoaiVanBan);
        theLoaiVanBanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the theLoaiVanBans.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiVanBan> findAll() {
        log.debug("Request to get all TheLoaiVanBans");
        return theLoaiVanBanRepository.findAll();
    }


    /**
     * Get one theLoaiVanBan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TheLoaiVanBan> findOne(Long id) {
        log.debug("Request to get TheLoaiVanBan : {}", id);
        return theLoaiVanBanRepository.findById(id);
    }

    /**
     * Delete the theLoaiVanBan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TheLoaiVanBan : {}", id);
        theLoaiVanBanRepository.deleteById(id);
        theLoaiVanBanSearchRepository.deleteById(id);
    }

    /**
     * Search for the theLoaiVanBan corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiVanBan> search(String query) {
        log.debug("Request to search TheLoaiVanBans for query {}", query);
        return StreamSupport
            .stream(theLoaiVanBanSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
