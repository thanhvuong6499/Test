package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.BanDanhGiaService;
import com.mycompany.myapp.domain.BanDanhGia;
import com.mycompany.myapp.repository.BanDanhGiaRepository;
import com.mycompany.myapp.repository.search.BanDanhGiaSearchRepository;
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
 * Service Implementation for managing BanDanhGia.
 */
@Service
@Transactional
public class BanDanhGiaServiceImpl implements BanDanhGiaService {

    private final Logger log = LoggerFactory.getLogger(BanDanhGiaServiceImpl.class);

    private final BanDanhGiaRepository banDanhGiaRepository;

    private final BanDanhGiaSearchRepository banDanhGiaSearchRepository;

    public BanDanhGiaServiceImpl(BanDanhGiaRepository banDanhGiaRepository, BanDanhGiaSearchRepository banDanhGiaSearchRepository) {
        this.banDanhGiaRepository = banDanhGiaRepository;
        this.banDanhGiaSearchRepository = banDanhGiaSearchRepository;
    }

    /**
     * Save a banDanhGia.
     *
     * @param banDanhGia the entity to save
     * @return the persisted entity
     */
    @Override
    public BanDanhGia save(BanDanhGia banDanhGia) {
        log.debug("Request to save BanDanhGia : {}", banDanhGia);        BanDanhGia result = banDanhGiaRepository.save(banDanhGia);
        banDanhGiaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the banDanhGias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BanDanhGia> findAll() {
        log.debug("Request to get all BanDanhGias");
        return banDanhGiaRepository.findAll();
    }


    /**
     * Get one banDanhGia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BanDanhGia> findOne(Long id) {
        log.debug("Request to get BanDanhGia : {}", id);
        return banDanhGiaRepository.findById(id);
    }

    /**
     * Delete the banDanhGia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BanDanhGia : {}", id);
        banDanhGiaRepository.deleteById(id);
        banDanhGiaSearchRepository.deleteById(id);
    }

    /**
     * Search for the banDanhGia corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BanDanhGia> search(String query) {
        log.debug("Request to search BanDanhGias for query {}", query);
        return StreamSupport
            .stream(banDanhGiaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
