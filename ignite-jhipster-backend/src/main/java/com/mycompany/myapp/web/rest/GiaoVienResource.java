package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.GiaoVien;
import com.mycompany.myapp.service.GiaoVienService;
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
 * REST controller for managing GiaoVien.
 */
@RestController
@RequestMapping("/api")
public class GiaoVienResource {

    private final Logger log = LoggerFactory.getLogger(GiaoVienResource.class);

    private static final String ENTITY_NAME = "giaoVien";

    private final GiaoVienService giaoVienService;

    public GiaoVienResource(GiaoVienService giaoVienService) {
        this.giaoVienService = giaoVienService;
    }

    /**
     * POST  /giao-viens : Create a new giaoVien.
     *
     * @param giaoVien the giaoVien to create
     * @return the ResponseEntity with status 201 (Created) and with body the new giaoVien, or with status 400 (Bad Request) if the giaoVien has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/giao-viens")
    @Timed
    public ResponseEntity<GiaoVien> createGiaoVien(@RequestBody GiaoVien giaoVien) throws URISyntaxException {
        log.debug("REST request to save GiaoVien : {}", giaoVien);
        if (giaoVien.getId() != null) {
            throw new BadRequestAlertException("A new giaoVien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GiaoVien result = giaoVienService.save(giaoVien);
        return ResponseEntity.created(new URI("/api/giao-viens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /giao-viens : Updates an existing giaoVien.
     *
     * @param giaoVien the giaoVien to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated giaoVien,
     * or with status 400 (Bad Request) if the giaoVien is not valid,
     * or with status 500 (Internal Server Error) if the giaoVien couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/giao-viens")
    @Timed
    public ResponseEntity<GiaoVien> updateGiaoVien(@RequestBody GiaoVien giaoVien) throws URISyntaxException {
        log.debug("REST request to update GiaoVien : {}", giaoVien);
        if (giaoVien.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GiaoVien result = giaoVienService.save(giaoVien);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, giaoVien.getId().toString()))
            .body(result);
    }

    /**
     * GET  /giao-viens : get all the giaoViens.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of giaoViens in body
     */
    @GetMapping("/giao-viens")
    @Timed
    public List<GiaoVien> getAllGiaoViens(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all GiaoViens");
        return giaoVienService.findAll();
    }

    /**
     * GET  /giao-viens/:id : get the "id" giaoVien.
     *
     * @param id the id of the giaoVien to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the giaoVien, or with status 404 (Not Found)
     */
    @GetMapping("/giao-viens/{id}")
    @Timed
    public ResponseEntity<GiaoVien> getGiaoVien(@PathVariable Long id) {
        log.debug("REST request to get GiaoVien : {}", id);
        Optional<GiaoVien> giaoVien = giaoVienService.findOne(id);
        return ResponseUtil.wrapOrNotFound(giaoVien);
    }

    /**
     * DELETE  /giao-viens/:id : delete the "id" giaoVien.
     *
     * @param id the id of the giaoVien to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/giao-viens/{id}")
    @Timed
    public ResponseEntity<Void> deleteGiaoVien(@PathVariable Long id) {
        log.debug("REST request to delete GiaoVien : {}", id);
        giaoVienService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/giao-viens?query=:query : search for the giaoVien corresponding
     * to the query.
     *
     * @param query the query of the giaoVien search
     * @return the result of the search
     */
    @GetMapping("/_search/giao-viens")
    @Timed
    public List<GiaoVien> searchGiaoViens(@RequestParam String query) {
        log.debug("REST request to search GiaoViens for query {}", query);
        return giaoVienService.search(query);
    }

}
