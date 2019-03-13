package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CauTraLoi;
import com.mycompany.myapp.service.CauTraLoiService;
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
 * REST controller for managing CauTraLoi.
 */
@RestController
@RequestMapping("/api")
public class CauTraLoiResource {

    private final Logger log = LoggerFactory.getLogger(CauTraLoiResource.class);

    private static final String ENTITY_NAME = "cauTraLoi";

    private final CauTraLoiService cauTraLoiService;

    public CauTraLoiResource(CauTraLoiService cauTraLoiService) {
        this.cauTraLoiService = cauTraLoiService;
    }

    /**
     * POST  /cau-tra-lois : Create a new cauTraLoi.
     *
     * @param cauTraLoi the cauTraLoi to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cauTraLoi, or with status 400 (Bad Request) if the cauTraLoi has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cau-tra-lois")
    @Timed
    public ResponseEntity<CauTraLoi> createCauTraLoi(@RequestBody CauTraLoi cauTraLoi) throws URISyntaxException {
        log.debug("REST request to save CauTraLoi : {}", cauTraLoi);
        if (cauTraLoi.getId() != null) {
            throw new BadRequestAlertException("A new cauTraLoi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CauTraLoi result = cauTraLoiService.save(cauTraLoi);
        return ResponseEntity.created(new URI("/api/cau-tra-lois/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cau-tra-lois : Updates an existing cauTraLoi.
     *
     * @param cauTraLoi the cauTraLoi to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cauTraLoi,
     * or with status 400 (Bad Request) if the cauTraLoi is not valid,
     * or with status 500 (Internal Server Error) if the cauTraLoi couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cau-tra-lois")
    @Timed
    public ResponseEntity<CauTraLoi> updateCauTraLoi(@RequestBody CauTraLoi cauTraLoi) throws URISyntaxException {
        log.debug("REST request to update CauTraLoi : {}", cauTraLoi);
        if (cauTraLoi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CauTraLoi result = cauTraLoiService.save(cauTraLoi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cauTraLoi.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cau-tra-lois : get all the cauTraLois.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cauTraLois in body
     */
    @GetMapping("/cau-tra-lois")
    @Timed
    public List<CauTraLoi> getAllCauTraLois() {
        log.debug("REST request to get all CauTraLois");
        return cauTraLoiService.findAll();
    }

    /**
     * GET  /cau-tra-lois/:id : get the "id" cauTraLoi.
     *
     * @param id the id of the cauTraLoi to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cauTraLoi, or with status 404 (Not Found)
     */
    @GetMapping("/cau-tra-lois/{id}")
    @Timed
    public ResponseEntity<CauTraLoi> getCauTraLoi(@PathVariable Long id) {
        log.debug("REST request to get CauTraLoi : {}", id);
        Optional<CauTraLoi> cauTraLoi = cauTraLoiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cauTraLoi);
    }

    /**
     * DELETE  /cau-tra-lois/:id : delete the "id" cauTraLoi.
     *
     * @param id the id of the cauTraLoi to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cau-tra-lois/{id}")
    @Timed
    public ResponseEntity<Void> deleteCauTraLoi(@PathVariable Long id) {
        log.debug("REST request to delete CauTraLoi : {}", id);
        cauTraLoiService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cau-tra-lois?query=:query : search for the cauTraLoi corresponding
     * to the query.
     *
     * @param query the query of the cauTraLoi search
     * @return the result of the search
     */
    @GetMapping("/_search/cau-tra-lois")
    @Timed
    public List<CauTraLoi> searchCauTraLois(@RequestParam String query) {
        log.debug("REST request to search CauTraLois for query {}", query);
        return cauTraLoiService.search(query);
    }

}
