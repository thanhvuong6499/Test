package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.VanBan;
import com.mycompany.myapp.service.VanBanService;
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
 * REST controller for managing VanBan.
 */
@RestController
@RequestMapping("/api")
public class VanBanResource {

    private final Logger log = LoggerFactory.getLogger(VanBanResource.class);

    private static final String ENTITY_NAME = "vanBan";

    private final VanBanService vanBanService;

    public VanBanResource(VanBanService vanBanService) {
        this.vanBanService = vanBanService;
    }

    /**
     * POST  /van-bans : Create a new vanBan.
     *
     * @param vanBan the vanBan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vanBan, or with status 400 (Bad Request) if the vanBan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/van-bans")
    @Timed
    public ResponseEntity<VanBan> createVanBan(@RequestBody VanBan vanBan) throws URISyntaxException {
        log.debug("REST request to save VanBan : {}", vanBan);
        if (vanBan.getId() != null) {
            throw new BadRequestAlertException("A new vanBan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VanBan result = vanBanService.save(vanBan);
        return ResponseEntity.created(new URI("/api/van-bans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /van-bans : Updates an existing vanBan.
     *
     * @param vanBan the vanBan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vanBan,
     * or with status 400 (Bad Request) if the vanBan is not valid,
     * or with status 500 (Internal Server Error) if the vanBan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/van-bans")
    @Timed
    public ResponseEntity<VanBan> updateVanBan(@RequestBody VanBan vanBan) throws URISyntaxException {
        log.debug("REST request to update VanBan : {}", vanBan);
        if (vanBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VanBan result = vanBanService.save(vanBan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vanBan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /van-bans : get all the vanBans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vanBans in body
     */
    @GetMapping("/van-bans")
    @Timed
    public List<VanBan> getAllVanBans() {
        log.debug("REST request to get all VanBans");
        return vanBanService.findAll();
    }

    /**
     * GET  /van-bans/:id : get the "id" vanBan.
     *
     * @param id the id of the vanBan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vanBan, or with status 404 (Not Found)
     */
    @GetMapping("/van-bans/{id}")
    @Timed
    public ResponseEntity<VanBan> getVanBan(@PathVariable Long id) {
        log.debug("REST request to get VanBan : {}", id);
        Optional<VanBan> vanBan = vanBanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vanBan);
    }

    /**
     * DELETE  /van-bans/:id : delete the "id" vanBan.
     *
     * @param id the id of the vanBan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/van-bans/{id}")
    @Timed
    public ResponseEntity<Void> deleteVanBan(@PathVariable Long id) {
        log.debug("REST request to delete VanBan : {}", id);
        vanBanService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/van-bans?query=:query : search for the vanBan corresponding
     * to the query.
     *
     * @param query the query of the vanBan search
     * @return the result of the search
     */
    @GetMapping("/_search/van-bans")
    @Timed
    public List<VanBan> searchVanBans(@RequestParam String query) {
        log.debug("REST request to search VanBans for query {}", query);
        return vanBanService.search(query);
    }

}
