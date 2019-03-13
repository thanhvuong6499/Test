package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CoQuanBanHanh;
import com.mycompany.myapp.service.CoQuanBanHanhService;
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
 * REST controller for managing CoQuanBanHanh.
 */
@RestController
@RequestMapping("/api")
public class CoQuanBanHanhResource {

    private final Logger log = LoggerFactory.getLogger(CoQuanBanHanhResource.class);

    private static final String ENTITY_NAME = "coQuanBanHanh";

    private final CoQuanBanHanhService coQuanBanHanhService;

    public CoQuanBanHanhResource(CoQuanBanHanhService coQuanBanHanhService) {
        this.coQuanBanHanhService = coQuanBanHanhService;
    }

    /**
     * POST  /co-quan-ban-hanhs : Create a new coQuanBanHanh.
     *
     * @param coQuanBanHanh the coQuanBanHanh to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coQuanBanHanh, or with status 400 (Bad Request) if the coQuanBanHanh has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/co-quan-ban-hanhs")
    @Timed
    public ResponseEntity<CoQuanBanHanh> createCoQuanBanHanh(@RequestBody CoQuanBanHanh coQuanBanHanh) throws URISyntaxException {
        log.debug("REST request to save CoQuanBanHanh : {}", coQuanBanHanh);
        if (coQuanBanHanh.getId() != null) {
            throw new BadRequestAlertException("A new coQuanBanHanh cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CoQuanBanHanh result = coQuanBanHanhService.save(coQuanBanHanh);
        return ResponseEntity.created(new URI("/api/co-quan-ban-hanhs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /co-quan-ban-hanhs : Updates an existing coQuanBanHanh.
     *
     * @param coQuanBanHanh the coQuanBanHanh to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coQuanBanHanh,
     * or with status 400 (Bad Request) if the coQuanBanHanh is not valid,
     * or with status 500 (Internal Server Error) if the coQuanBanHanh couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/co-quan-ban-hanhs")
    @Timed
    public ResponseEntity<CoQuanBanHanh> updateCoQuanBanHanh(@RequestBody CoQuanBanHanh coQuanBanHanh) throws URISyntaxException {
        log.debug("REST request to update CoQuanBanHanh : {}", coQuanBanHanh);
        if (coQuanBanHanh.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CoQuanBanHanh result = coQuanBanHanhService.save(coQuanBanHanh);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, coQuanBanHanh.getId().toString()))
            .body(result);
    }

    /**
     * GET  /co-quan-ban-hanhs : get all the coQuanBanHanhs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of coQuanBanHanhs in body
     */
    @GetMapping("/co-quan-ban-hanhs")
    @Timed
    public List<CoQuanBanHanh> getAllCoQuanBanHanhs() {
        log.debug("REST request to get all CoQuanBanHanhs");
        return coQuanBanHanhService.findAll();
    }

    /**
     * GET  /co-quan-ban-hanhs/:id : get the "id" coQuanBanHanh.
     *
     * @param id the id of the coQuanBanHanh to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coQuanBanHanh, or with status 404 (Not Found)
     */
    @GetMapping("/co-quan-ban-hanhs/{id}")
    @Timed
    public ResponseEntity<CoQuanBanHanh> getCoQuanBanHanh(@PathVariable Long id) {
        log.debug("REST request to get CoQuanBanHanh : {}", id);
        Optional<CoQuanBanHanh> coQuanBanHanh = coQuanBanHanhService.findOne(id);
        return ResponseUtil.wrapOrNotFound(coQuanBanHanh);
    }

    /**
     * DELETE  /co-quan-ban-hanhs/:id : delete the "id" coQuanBanHanh.
     *
     * @param id the id of the coQuanBanHanh to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/co-quan-ban-hanhs/{id}")
    @Timed
    public ResponseEntity<Void> deleteCoQuanBanHanh(@PathVariable Long id) {
        log.debug("REST request to delete CoQuanBanHanh : {}", id);
        coQuanBanHanhService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/co-quan-ban-hanhs?query=:query : search for the coQuanBanHanh corresponding
     * to the query.
     *
     * @param query the query of the coQuanBanHanh search
     * @return the result of the search
     */
    @GetMapping("/_search/co-quan-ban-hanhs")
    @Timed
    public List<CoQuanBanHanh> searchCoQuanBanHanhs(@RequestParam String query) {
        log.debug("REST request to search CoQuanBanHanhs for query {}", query);
        return coQuanBanHanhService.search(query);
    }

}
