package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TheLoaiTieuChi;
import com.mycompany.myapp.service.TheLoaiTieuChiService;
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
 * REST controller for managing TheLoaiTieuChi.
 */
@RestController
@RequestMapping("/api")
public class TheLoaiTieuChiResource {

    private final Logger log = LoggerFactory.getLogger(TheLoaiTieuChiResource.class);

    private static final String ENTITY_NAME = "theLoaiTieuChi";

    private final TheLoaiTieuChiService theLoaiTieuChiService;

    public TheLoaiTieuChiResource(TheLoaiTieuChiService theLoaiTieuChiService) {
        this.theLoaiTieuChiService = theLoaiTieuChiService;
    }

    /**
     * POST  /the-loai-tieu-chis : Create a new theLoaiTieuChi.
     *
     * @param theLoaiTieuChi the theLoaiTieuChi to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theLoaiTieuChi, or with status 400 (Bad Request) if the theLoaiTieuChi has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-loai-tieu-chis")
    @Timed
    public ResponseEntity<TheLoaiTieuChi> createTheLoaiTieuChi(@RequestBody TheLoaiTieuChi theLoaiTieuChi) throws URISyntaxException {
        log.debug("REST request to save TheLoaiTieuChi : {}", theLoaiTieuChi);
        if (theLoaiTieuChi.getId() != null) {
            throw new BadRequestAlertException("A new theLoaiTieuChi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheLoaiTieuChi result = theLoaiTieuChiService.save(theLoaiTieuChi);
        return ResponseEntity.created(new URI("/api/the-loai-tieu-chis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-loai-tieu-chis : Updates an existing theLoaiTieuChi.
     *
     * @param theLoaiTieuChi the theLoaiTieuChi to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theLoaiTieuChi,
     * or with status 400 (Bad Request) if the theLoaiTieuChi is not valid,
     * or with status 500 (Internal Server Error) if the theLoaiTieuChi couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-loai-tieu-chis")
    @Timed
    public ResponseEntity<TheLoaiTieuChi> updateTheLoaiTieuChi(@RequestBody TheLoaiTieuChi theLoaiTieuChi) throws URISyntaxException {
        log.debug("REST request to update TheLoaiTieuChi : {}", theLoaiTieuChi);
        if (theLoaiTieuChi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TheLoaiTieuChi result = theLoaiTieuChiService.save(theLoaiTieuChi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theLoaiTieuChi.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-loai-tieu-chis : get all the theLoaiTieuChis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theLoaiTieuChis in body
     */
    @GetMapping("/the-loai-tieu-chis")
    @Timed
    public List<TheLoaiTieuChi> getAllTheLoaiTieuChis() {
        log.debug("REST request to get all TheLoaiTieuChis");
        return theLoaiTieuChiService.findAll();
    }

    /**
     * GET  /the-loai-tieu-chis/:id : get the "id" theLoaiTieuChi.
     *
     * @param id the id of the theLoaiTieuChi to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theLoaiTieuChi, or with status 404 (Not Found)
     */
    @GetMapping("/the-loai-tieu-chis/{id}")
    @Timed
    public ResponseEntity<TheLoaiTieuChi> getTheLoaiTieuChi(@PathVariable Long id) {
        log.debug("REST request to get TheLoaiTieuChi : {}", id);
        Optional<TheLoaiTieuChi> theLoaiTieuChi = theLoaiTieuChiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(theLoaiTieuChi);
    }

    /**
     * DELETE  /the-loai-tieu-chis/:id : delete the "id" theLoaiTieuChi.
     *
     * @param id the id of the theLoaiTieuChi to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-loai-tieu-chis/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheLoaiTieuChi(@PathVariable Long id) {
        log.debug("REST request to delete TheLoaiTieuChi : {}", id);
        theLoaiTieuChiService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/the-loai-tieu-chis?query=:query : search for the theLoaiTieuChi corresponding
     * to the query.
     *
     * @param query the query of the theLoaiTieuChi search
     * @return the result of the search
     */
    @GetMapping("/_search/the-loai-tieu-chis")
    @Timed
    public List<TheLoaiTieuChi> searchTheLoaiTieuChis(@RequestParam String query) {
        log.debug("REST request to search TheLoaiTieuChis for query {}", query);
        return theLoaiTieuChiService.search(query);
    }

}
