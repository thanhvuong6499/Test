package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TieuChiDanhGiaService;
import com.mycompany.myapp.domain.TieuChiDanhGia;
import com.mycompany.myapp.repository.TieuChiDanhGiaRepository;
import com.mycompany.myapp.repository.search.TieuChiDanhGiaSearchRepository;
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
 * Service Implementation for managing TieuChiDanhGia.
 */
@Service
@Transactional
public class TieuChiDanhGiaServiceImpl implements TieuChiDanhGiaService {

    private final Logger log = LoggerFactory.getLogger(TieuChiDanhGiaServiceImpl.class);

    private final TieuChiDanhGiaRepository tieuChiDanhGiaRepository;

    private final TieuChiDanhGiaSearchRepository tieuChiDanhGiaSearchRepository;

    public TieuChiDanhGiaServiceImpl(TieuChiDanhGiaRepository tieuChiDanhGiaRepository, TieuChiDanhGiaSearchRepository tieuChiDanhGiaSearchRepository) {
        this.tieuChiDanhGiaRepository = tieuChiDanhGiaRepository;
        this.tieuChiDanhGiaSearchRepository = tieuChiDanhGiaSearchRepository;
    }

    /**
     * Save a tieuChiDanhGia.
     *
     * @param tieuChiDanhGia the entity to save
     * @return the persisted entity
     */
    @Override
    public TieuChiDanhGia save(TieuChiDanhGia tieuChiDanhGia) {
        log.debug("Request to save TieuChiDanhGia : {}", tieuChiDanhGia);        TieuChiDanhGia result = tieuChiDanhGiaRepository.save(tieuChiDanhGia);
        tieuChiDanhGiaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tieuChiDanhGias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TieuChiDanhGia> findAll() {
        log.debug("Request to get all TieuChiDanhGias");
        return tieuChiDanhGiaRepository.findAll();
    }


    /**
     * Get one tieuChiDanhGia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TieuChiDanhGia> findOne(Long id) {
        log.debug("Request to get TieuChiDanhGia : {}", id);
        return tieuChiDanhGiaRepository.findById(id);
    }

    /**
     * Delete the tieuChiDanhGia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TieuChiDanhGia : {}", id);
        tieuChiDanhGiaRepository.deleteById(id);
        tieuChiDanhGiaSearchRepository.deleteById(id);
    }

    /**
     * Search for the tieuChiDanhGia corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TieuChiDanhGia> search(String query) {
        log.debug("Request to search TieuChiDanhGias for query {}", query);
        return StreamSupport
            .stream(tieuChiDanhGiaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
