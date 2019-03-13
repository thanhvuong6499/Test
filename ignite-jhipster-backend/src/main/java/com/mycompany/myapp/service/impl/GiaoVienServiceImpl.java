package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.GiaoVienService;
import com.mycompany.myapp.domain.GiaoVien;
import com.mycompany.myapp.repository.GiaoVienRepository;
import com.mycompany.myapp.repository.search.GiaoVienSearchRepository;
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
 * Service Implementation for managing GiaoVien.
 */
@Service
@Transactional
public class GiaoVienServiceImpl implements GiaoVienService {

    private final Logger log = LoggerFactory.getLogger(GiaoVienServiceImpl.class);

    private final GiaoVienRepository giaoVienRepository;

    private final GiaoVienSearchRepository giaoVienSearchRepository;

    public GiaoVienServiceImpl(GiaoVienRepository giaoVienRepository, GiaoVienSearchRepository giaoVienSearchRepository) {
        this.giaoVienRepository = giaoVienRepository;
        this.giaoVienSearchRepository = giaoVienSearchRepository;
    }

    /**
     * Save a giaoVien.
     *
     * @param giaoVien the entity to save
     * @return the persisted entity
     */
    @Override
    public GiaoVien save(GiaoVien giaoVien) {
        log.debug("Request to save GiaoVien : {}", giaoVien);        GiaoVien result = giaoVienRepository.save(giaoVien);
        giaoVienSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the giaoViens.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GiaoVien> findAll() {
        log.debug("Request to get all GiaoViens");
        return giaoVienRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the GiaoVien with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<GiaoVien> findAllWithEagerRelationships(Pageable pageable) {
        return giaoVienRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one giaoVien by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GiaoVien> findOne(Long id) {
        log.debug("Request to get GiaoVien : {}", id);
        return giaoVienRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the giaoVien by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GiaoVien : {}", id);
        giaoVienRepository.deleteById(id);
        giaoVienSearchRepository.deleteById(id);
    }

    /**
     * Search for the giaoVien corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GiaoVien> search(String query) {
        log.debug("Request to search GiaoViens for query {}", query);
        return StreamSupport
            .stream(giaoVienSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
