package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TaiLieu;
import com.mycompany.myapp.service.TaiLieuService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TaiLieu.
 */
@RestController
@RequestMapping("/api")
public class TaiLieuResource {

    private final Logger log = LoggerFactory.getLogger(TaiLieuResource.class);

    private static final String ENTITY_NAME = "taiLieu";

    private final TaiLieuService taiLieuService;

    public TaiLieuResource(TaiLieuService taiLieuService) {
        this.taiLieuService = taiLieuService;
    }

    /**
     * POST  /tai-lieus : Create a new taiLieu.
     *
     * @param taiLieu the taiLieu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taiLieu, or with status 400 (Bad Request) if the taiLieu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tai-lieus")
    @Timed
    public ResponseEntity<TaiLieu> createTaiLieu(@RequestBody TaiLieu taiLieu) throws URISyntaxException {
        log.debug("REST request to save TaiLieu : {}", taiLieu);
        if (taiLieu.getId() != null) {
            throw new BadRequestAlertException("A new taiLieu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaiLieu result = taiLieuService.save(taiLieu);
        return ResponseEntity.created(new URI("/api/tai-lieus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tai-lieus : Updates an existing taiLieu.
     *
     * @param taiLieu the taiLieu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taiLieu,
     * or with status 400 (Bad Request) if the taiLieu is not valid,
     * or with status 500 (Internal Server Error) if the taiLieu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tai-lieus")
    @Timed
    public ResponseEntity<TaiLieu> updateTaiLieu(@RequestBody TaiLieu taiLieu) throws URISyntaxException {
        log.debug("REST request to update TaiLieu : {}", taiLieu);
        if (taiLieu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaiLieu result = taiLieuService.save(taiLieu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taiLieu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tai-lieus : get all the taiLieus.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of taiLieus in body
     */
    @GetMapping("/tai-lieus")
    @Timed
    public List<TaiLieu> getAllTaiLieus(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TaiLieus");
        return taiLieuService.findAll();
    }

    /**
     * GET  /tai-lieus/:id : get the "id" taiLieu.
     *
     * @param id the id of the taiLieu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taiLieu, or with status 404 (Not Found)
     */
    @GetMapping("/tai-lieus/{id}")
    @Timed
    public ResponseEntity<TaiLieu> getTaiLieu(@PathVariable Long id) {
        log.debug("REST request to get TaiLieu : {}", id);
        Optional<TaiLieu> taiLieu = taiLieuService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taiLieu);
    }

    /**
     * DELETE  /tai-lieus/:id : delete the "id" taiLieu.
     *
     * @param id the id of the taiLieu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tai-lieus/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaiLieu(@PathVariable Long id) {
        log.debug("REST request to delete TaiLieu : {}", id);
        taiLieuService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tai-lieus?query=:query : search for the taiLieu corresponding
     * to the query.
     *
     * @param query the query of the taiLieu search
     * @return the result of the search
     */
    @GetMapping("/_search/tai-lieus")
    @Timed
    public List<TaiLieu> searchTaiLieus(@RequestParam String query) {
        log.debug("REST request to search TaiLieus for query {}", query);
        return taiLieuService.search(query);
    }

}
