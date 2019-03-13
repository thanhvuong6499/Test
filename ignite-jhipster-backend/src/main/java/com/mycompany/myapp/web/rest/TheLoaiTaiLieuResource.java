package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TheLoaiTaiLieu;
import com.mycompany.myapp.service.TheLoaiTaiLieuService;
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
 * REST controller for managing TheLoaiTaiLieu.
 */
@RestController
@RequestMapping("/api")
public class TheLoaiTaiLieuResource {

    private final Logger log = LoggerFactory.getLogger(TheLoaiTaiLieuResource.class);

    private static final String ENTITY_NAME = "theLoaiTaiLieu";

    private final TheLoaiTaiLieuService theLoaiTaiLieuService;

    public TheLoaiTaiLieuResource(TheLoaiTaiLieuService theLoaiTaiLieuService) {
        this.theLoaiTaiLieuService = theLoaiTaiLieuService;
    }

    /**
     * POST  /the-loai-tai-lieus : Create a new theLoaiTaiLieu.
     *
     * @param theLoaiTaiLieu the theLoaiTaiLieu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theLoaiTaiLieu, or with status 400 (Bad Request) if the theLoaiTaiLieu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-loai-tai-lieus")
    @Timed
    public ResponseEntity<TheLoaiTaiLieu> createTheLoaiTaiLieu(@RequestBody TheLoaiTaiLieu theLoaiTaiLieu) throws URISyntaxException {
        log.debug("REST request to save TheLoaiTaiLieu : {}", theLoaiTaiLieu);
        if (theLoaiTaiLieu.getId() != null) {
            throw new BadRequestAlertException("A new theLoaiTaiLieu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheLoaiTaiLieu result = theLoaiTaiLieuService.save(theLoaiTaiLieu);
        return ResponseEntity.created(new URI("/api/the-loai-tai-lieus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-loai-tai-lieus : Updates an existing theLoaiTaiLieu.
     *
     * @param theLoaiTaiLieu the theLoaiTaiLieu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theLoaiTaiLieu,
     * or with status 400 (Bad Request) if the theLoaiTaiLieu is not valid,
     * or with status 500 (Internal Server Error) if the theLoaiTaiLieu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-loai-tai-lieus")
    @Timed
    public ResponseEntity<TheLoaiTaiLieu> updateTheLoaiTaiLieu(@RequestBody TheLoaiTaiLieu theLoaiTaiLieu) throws URISyntaxException {
        log.debug("REST request to update TheLoaiTaiLieu : {}", theLoaiTaiLieu);
        if (theLoaiTaiLieu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TheLoaiTaiLieu result = theLoaiTaiLieuService.save(theLoaiTaiLieu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theLoaiTaiLieu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-loai-tai-lieus : get all the theLoaiTaiLieus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theLoaiTaiLieus in body
     */
    @GetMapping("/the-loai-tai-lieus")
    @Timed
    public List<TheLoaiTaiLieu> getAllTheLoaiTaiLieus() {
        log.debug("REST request to get all TheLoaiTaiLieus");
        return theLoaiTaiLieuService.findAll();
    }

    /**
     * GET  /the-loai-tai-lieus/:id : get the "id" theLoaiTaiLieu.
     *
     * @param id the id of the theLoaiTaiLieu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theLoaiTaiLieu, or with status 404 (Not Found)
     */
    @GetMapping("/the-loai-tai-lieus/{id}")
    @Timed
    public ResponseEntity<TheLoaiTaiLieu> getTheLoaiTaiLieu(@PathVariable Long id) {
        log.debug("REST request to get TheLoaiTaiLieu : {}", id);
        Optional<TheLoaiTaiLieu> theLoaiTaiLieu = theLoaiTaiLieuService.findOne(id);
        return ResponseUtil.wrapOrNotFound(theLoaiTaiLieu);
    }

    /**
     * DELETE  /the-loai-tai-lieus/:id : delete the "id" theLoaiTaiLieu.
     *
     * @param id the id of the theLoaiTaiLieu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-loai-tai-lieus/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheLoaiTaiLieu(@PathVariable Long id) {
        log.debug("REST request to delete TheLoaiTaiLieu : {}", id);
        theLoaiTaiLieuService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/the-loai-tai-lieus?query=:query : search for the theLoaiTaiLieu corresponding
     * to the query.
     *
     * @param query the query of the theLoaiTaiLieu search
     * @return the result of the search
     */
    @GetMapping("/_search/the-loai-tai-lieus")
    @Timed
    public List<TheLoaiTaiLieu> searchTheLoaiTaiLieus(@RequestParam String query) {
        log.debug("REST request to search TheLoaiTaiLieus for query {}", query);
        return theLoaiTaiLieuService.search(query);
    }

}
