package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TheLoaiVanBan;
import com.mycompany.myapp.service.TheLoaiVanBanService;
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
 * REST controller for managing TheLoaiVanBan.
 */
@RestController
@RequestMapping("/api")
public class TheLoaiVanBanResource {

    private final Logger log = LoggerFactory.getLogger(TheLoaiVanBanResource.class);

    private static final String ENTITY_NAME = "theLoaiVanBan";

    private final TheLoaiVanBanService theLoaiVanBanService;

    public TheLoaiVanBanResource(TheLoaiVanBanService theLoaiVanBanService) {
        this.theLoaiVanBanService = theLoaiVanBanService;
    }

    /**
     * POST  /the-loai-van-bans : Create a new theLoaiVanBan.
     *
     * @param theLoaiVanBan the theLoaiVanBan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theLoaiVanBan, or with status 400 (Bad Request) if the theLoaiVanBan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-loai-van-bans")
    @Timed
    public ResponseEntity<TheLoaiVanBan> createTheLoaiVanBan(@RequestBody TheLoaiVanBan theLoaiVanBan) throws URISyntaxException {
        log.debug("REST request to save TheLoaiVanBan : {}", theLoaiVanBan);
        if (theLoaiVanBan.getId() != null) {
            throw new BadRequestAlertException("A new theLoaiVanBan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheLoaiVanBan result = theLoaiVanBanService.save(theLoaiVanBan);
        return ResponseEntity.created(new URI("/api/the-loai-van-bans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-loai-van-bans : Updates an existing theLoaiVanBan.
     *
     * @param theLoaiVanBan the theLoaiVanBan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theLoaiVanBan,
     * or with status 400 (Bad Request) if the theLoaiVanBan is not valid,
     * or with status 500 (Internal Server Error) if the theLoaiVanBan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-loai-van-bans")
    @Timed
    public ResponseEntity<TheLoaiVanBan> updateTheLoaiVanBan(@RequestBody TheLoaiVanBan theLoaiVanBan) throws URISyntaxException {
        log.debug("REST request to update TheLoaiVanBan : {}", theLoaiVanBan);
        if (theLoaiVanBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TheLoaiVanBan result = theLoaiVanBanService.save(theLoaiVanBan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theLoaiVanBan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-loai-van-bans : get all the theLoaiVanBans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theLoaiVanBans in body
     */
    @GetMapping("/the-loai-van-bans")
    @Timed
    public List<TheLoaiVanBan> getAllTheLoaiVanBans() {
        log.debug("REST request to get all TheLoaiVanBans");
        return theLoaiVanBanService.findAll();
    }

    /**
     * GET  /the-loai-van-bans/:id : get the "id" theLoaiVanBan.
     *
     * @param id the id of the theLoaiVanBan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theLoaiVanBan, or with status 404 (Not Found)
     */
    @GetMapping("/the-loai-van-bans/{id}")
    @Timed
    public ResponseEntity<TheLoaiVanBan> getTheLoaiVanBan(@PathVariable Long id) {
        log.debug("REST request to get TheLoaiVanBan : {}", id);
        Optional<TheLoaiVanBan> theLoaiVanBan = theLoaiVanBanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(theLoaiVanBan);
    }

    /**
     * DELETE  /the-loai-van-bans/:id : delete the "id" theLoaiVanBan.
     *
     * @param id the id of the theLoaiVanBan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-loai-van-bans/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheLoaiVanBan(@PathVariable Long id) {
        log.debug("REST request to delete TheLoaiVanBan : {}", id);
        theLoaiVanBanService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/the-loai-van-bans?query=:query : search for the theLoaiVanBan corresponding
     * to the query.
     *
     * @param query the query of the theLoaiVanBan search
     * @return the result of the search
     */
    @GetMapping("/_search/the-loai-van-bans")
    @Timed
    public List<TheLoaiVanBan> searchTheLoaiVanBans(@RequestParam String query) {
        log.debug("REST request to search TheLoaiVanBans for query {}", query);
        return theLoaiVanBanService.search(query);
    }

}
