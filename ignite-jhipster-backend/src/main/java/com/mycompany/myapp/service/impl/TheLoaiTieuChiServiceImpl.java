package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TheLoaiTieuChiService;
import com.mycompany.myapp.domain.TheLoaiTieuChi;
import com.mycompany.myapp.repository.TheLoaiTieuChiRepository;
import com.mycompany.myapp.repository.search.TheLoaiTieuChiSearchRepository;
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
 * Service Implementation for managing TheLoaiTieuChi.
 */
@Service
@Transactional
public class TheLoaiTieuChiServiceImpl implements TheLoaiTieuChiService {

    private final Logger log = LoggerFactory.getLogger(TheLoaiTieuChiServiceImpl.class);

    private final TheLoaiTieuChiRepository theLoaiTieuChiRepository;

    private final TheLoaiTieuChiSearchRepository theLoaiTieuChiSearchRepository;

    public TheLoaiTieuChiServiceImpl(TheLoaiTieuChiRepository theLoaiTieuChiRepository, TheLoaiTieuChiSearchRepository theLoaiTieuChiSearchRepository) {
        this.theLoaiTieuChiRepository = theLoaiTieuChiRepository;
        this.theLoaiTieuChiSearchRepository = theLoaiTieuChiSearchRepository;
    }

    /**
     * Save a theLoaiTieuChi.
     *
     * @param theLoaiTieuChi the entity to save
     * @return the persisted entity
     */
    @Override
    public TheLoaiTieuChi save(TheLoaiTieuChi theLoaiTieuChi) {
        log.debug("Request to save TheLoaiTieuChi : {}", theLoaiTieuChi);        TheLoaiTieuChi result = theLoaiTieuChiRepository.save(theLoaiTieuChi);
        theLoaiTieuChiSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the theLoaiTieuChis.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiTieuChi> findAll() {
        log.debug("Request to get all TheLoaiTieuChis");
        return theLoaiTieuChiRepository.findAll();
    }


    /**
     * Get one theLoaiTieuChi by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TheLoaiTieuChi> findOne(Long id) {
        log.debug("Request to get TheLoaiTieuChi : {}", id);
        return theLoaiTieuChiRepository.findById(id);
    }

    /**
     * Delete the theLoaiTieuChi by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TheLoaiTieuChi : {}", id);
        theLoaiTieuChiRepository.deleteById(id);
        theLoaiTieuChiSearchRepository.deleteById(id);
    }

    /**
     * Search for the theLoaiTieuChi corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TheLoaiTieuChi> search(String query) {
        log.debug("Request to search TheLoaiTieuChis for query {}", query);
        return StreamSupport
            .stream(theLoaiTieuChiSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
