package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.BanDanhGia;
import com.mycompany.myapp.service.BanDanhGiaService;
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
 * REST controller for managing BanDanhGia.
 */
@RestController
@RequestMapping("/api")
public class BanDanhGiaResource {

    private final Logger log = LoggerFactory.getLogger(BanDanhGiaResource.class);

    private static final String ENTITY_NAME = "banDanhGia";

    private final BanDanhGiaService banDanhGiaService;

    public BanDanhGiaResource(BanDanhGiaService banDanhGiaService) {
        this.banDanhGiaService = banDanhGiaService;
    }

    /**
     * POST  /ban-danh-gias : Create a new banDanhGia.
     *
     * @param banDanhGia the banDanhGia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new banDanhGia, or with status 400 (Bad Request) if the banDanhGia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ban-danh-gias")
    @Timed
    public ResponseEntity<BanDanhGia> createBanDanhGia(@RequestBody BanDanhGia banDanhGia) throws URISyntaxException {
        log.debug("REST request to save BanDanhGia : {}", banDanhGia);
        if (banDanhGia.getId() != null) {
            throw new BadRequestAlertException("A new banDanhGia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BanDanhGia result = banDanhGiaService.save(banDanhGia);
        return ResponseEntity.created(new URI("/api/ban-danh-gias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ban-danh-gias : Updates an existing banDanhGia.
     *
     * @param banDanhGia the banDanhGia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated banDanhGia,
     * or with status 400 (Bad Request) if the banDanhGia is not valid,
     * or with status 500 (Internal Server Error) if the banDanhGia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ban-danh-gias")
    @Timed
    public ResponseEntity<BanDanhGia> updateBanDanhGia(@RequestBody BanDanhGia banDanhGia) throws URISyntaxException {
        log.debug("REST request to update BanDanhGia : {}", banDanhGia);
        if (banDanhGia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BanDanhGia result = banDanhGiaService.save(banDanhGia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, banDanhGia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ban-danh-gias : get all the banDanhGias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banDanhGias in body
     */
    @GetMapping("/ban-danh-gias")
    @Timed
    public List<BanDanhGia> getAllBanDanhGias() {
        log.debug("REST request to get all BanDanhGias");
        return banDanhGiaService.findAll();
    }

    /**
     * GET  /ban-danh-gias/:id : get the "id" banDanhGia.
     *
     * @param id the id of the banDanhGia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the banDanhGia, or with status 404 (Not Found)
     */
    @GetMapping("/ban-danh-gias/{id}")
    @Timed
    public ResponseEntity<BanDanhGia> getBanDanhGia(@PathVariable Long id) {
        log.debug("REST request to get BanDanhGia : {}", id);
        Optional<BanDanhGia> banDanhGia = banDanhGiaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(banDanhGia);
    }

    /**
     * DELETE  /ban-danh-gias/:id : delete the "id" banDanhGia.
     *
     * @param id the id of the banDanhGia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ban-danh-gias/{id}")
    @Timed
    public ResponseEntity<Void> deleteBanDanhGia(@PathVariable Long id) {
        log.debug("REST request to delete BanDanhGia : {}", id);
        banDanhGiaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/ban-danh-gias?query=:query : search for the banDanhGia corresponding
     * to the query.
     *
     * @param query the query of the banDanhGia search
     * @return the result of the search
     */
    @GetMapping("/_search/ban-danh-gias")
    @Timed
    public List<BanDanhGia> searchBanDanhGias(@RequestParam String query) {
        log.debug("REST request to search BanDanhGias for query {}", query);
        return banDanhGiaService.search(query);
    }

}
