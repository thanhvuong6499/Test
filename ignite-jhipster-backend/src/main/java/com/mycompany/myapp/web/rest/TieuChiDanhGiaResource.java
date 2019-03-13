package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TieuChiDanhGia;
import com.mycompany.myapp.service.TieuChiDanhGiaService;
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
 * REST controller for managing TieuChiDanhGia.
 */
@RestController
@RequestMapping("/api")
public class TieuChiDanhGiaResource {

    private final Logger log = LoggerFactory.getLogger(TieuChiDanhGiaResource.class);

    private static final String ENTITY_NAME = "tieuChiDanhGia";

    private final TieuChiDanhGiaService tieuChiDanhGiaService;

    public TieuChiDanhGiaResource(TieuChiDanhGiaService tieuChiDanhGiaService) {
        this.tieuChiDanhGiaService = tieuChiDanhGiaService;
    }

    /**
     * POST  /tieu-chi-danh-gias : Create a new tieuChiDanhGia.
     *
     * @param tieuChiDanhGia the tieuChiDanhGia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tieuChiDanhGia, or with status 400 (Bad Request) if the tieuChiDanhGia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tieu-chi-danh-gias")
    @Timed
    public ResponseEntity<TieuChiDanhGia> createTieuChiDanhGia(@RequestBody TieuChiDanhGia tieuChiDanhGia) throws URISyntaxException {
        log.debug("REST request to save TieuChiDanhGia : {}", tieuChiDanhGia);
        if (tieuChiDanhGia.getId() != null) {
            throw new BadRequestAlertException("A new tieuChiDanhGia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TieuChiDanhGia result = tieuChiDanhGiaService.save(tieuChiDanhGia);
        return ResponseEntity.created(new URI("/api/tieu-chi-danh-gias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tieu-chi-danh-gias : Updates an existing tieuChiDanhGia.
     *
     * @param tieuChiDanhGia the tieuChiDanhGia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tieuChiDanhGia,
     * or with status 400 (Bad Request) if the tieuChiDanhGia is not valid,
     * or with status 500 (Internal Server Error) if the tieuChiDanhGia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tieu-chi-danh-gias")
    @Timed
    public ResponseEntity<TieuChiDanhGia> updateTieuChiDanhGia(@RequestBody TieuChiDanhGia tieuChiDanhGia) throws URISyntaxException {
        log.debug("REST request to update TieuChiDanhGia : {}", tieuChiDanhGia);
        if (tieuChiDanhGia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TieuChiDanhGia result = tieuChiDanhGiaService.save(tieuChiDanhGia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tieuChiDanhGia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tieu-chi-danh-gias : get all the tieuChiDanhGias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tieuChiDanhGias in body
     */
    @GetMapping("/tieu-chi-danh-gias")
    @Timed
    public List<TieuChiDanhGia> getAllTieuChiDanhGias() {
        log.debug("REST request to get all TieuChiDanhGias");
        return tieuChiDanhGiaService.findAll();
    }

    /**
     * GET  /tieu-chi-danh-gias/:id : get the "id" tieuChiDanhGia.
     *
     * @param id the id of the tieuChiDanhGia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tieuChiDanhGia, or with status 404 (Not Found)
     */
    @GetMapping("/tieu-chi-danh-gias/{id}")
    @Timed
    public ResponseEntity<TieuChiDanhGia> getTieuChiDanhGia(@PathVariable Long id) {
        log.debug("REST request to get TieuChiDanhGia : {}", id);
        Optional<TieuChiDanhGia> tieuChiDanhGia = tieuChiDanhGiaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tieuChiDanhGia);
    }

    /**
     * DELETE  /tieu-chi-danh-gias/:id : delete the "id" tieuChiDanhGia.
     *
     * @param id the id of the tieuChiDanhGia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tieu-chi-danh-gias/{id}")
    @Timed
    public ResponseEntity<Void> deleteTieuChiDanhGia(@PathVariable Long id) {
        log.debug("REST request to delete TieuChiDanhGia : {}", id);
        tieuChiDanhGiaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tieu-chi-danh-gias?query=:query : search for the tieuChiDanhGia corresponding
     * to the query.
     *
     * @param query the query of the tieuChiDanhGia search
     * @return the result of the search
     */
    @GetMapping("/_search/tieu-chi-danh-gias")
    @Timed
    public List<TieuChiDanhGia> searchTieuChiDanhGias(@RequestParam String query) {
        log.debug("REST request to search TieuChiDanhGias for query {}", query);
        return tieuChiDanhGiaService.search(query);
    }

}
