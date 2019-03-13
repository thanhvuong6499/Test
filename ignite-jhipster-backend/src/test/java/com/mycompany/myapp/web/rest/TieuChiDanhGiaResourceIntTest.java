package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.TieuChiDanhGia;
import com.mycompany.myapp.repository.TieuChiDanhGiaRepository;
import com.mycompany.myapp.repository.search.TieuChiDanhGiaSearchRepository;
import com.mycompany.myapp.service.TieuChiDanhGiaService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TieuChiDanhGiaResource REST controller.
 *
 * @see TieuChiDanhGiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TieuChiDanhGiaResourceIntTest {

    private static final String DEFAULT_NOI_DUNG = "AAAAAAAAAA";
    private static final String UPDATED_NOI_DUNG = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    @Autowired
    private TieuChiDanhGiaRepository tieuChiDanhGiaRepository;

    

    @Autowired
    private TieuChiDanhGiaService tieuChiDanhGiaService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TieuChiDanhGiaSearchRepositoryMockConfiguration
     */
    @Autowired
    private TieuChiDanhGiaSearchRepository mockTieuChiDanhGiaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTieuChiDanhGiaMockMvc;

    private TieuChiDanhGia tieuChiDanhGia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TieuChiDanhGiaResource tieuChiDanhGiaResource = new TieuChiDanhGiaResource(tieuChiDanhGiaService);
        this.restTieuChiDanhGiaMockMvc = MockMvcBuilders.standaloneSetup(tieuChiDanhGiaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TieuChiDanhGia createEntity(EntityManager em) {
        TieuChiDanhGia tieuChiDanhGia = new TieuChiDanhGia()
            .noiDung(DEFAULT_NOI_DUNG)
            .level(DEFAULT_LEVEL);
        return tieuChiDanhGia;
    }

    @Before
    public void initTest() {
        tieuChiDanhGia = createEntity(em);
    }

    @Test
    @Transactional
    public void createTieuChiDanhGia() throws Exception {
        int databaseSizeBeforeCreate = tieuChiDanhGiaRepository.findAll().size();

        // Create the TieuChiDanhGia
        restTieuChiDanhGiaMockMvc.perform(post("/api/tieu-chi-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tieuChiDanhGia)))
            .andExpect(status().isCreated());

        // Validate the TieuChiDanhGia in the database
        List<TieuChiDanhGia> tieuChiDanhGiaList = tieuChiDanhGiaRepository.findAll();
        assertThat(tieuChiDanhGiaList).hasSize(databaseSizeBeforeCreate + 1);
        TieuChiDanhGia testTieuChiDanhGia = tieuChiDanhGiaList.get(tieuChiDanhGiaList.size() - 1);
        assertThat(testTieuChiDanhGia.getNoiDung()).isEqualTo(DEFAULT_NOI_DUNG);
        assertThat(testTieuChiDanhGia.getLevel()).isEqualTo(DEFAULT_LEVEL);

        // Validate the TieuChiDanhGia in Elasticsearch
        verify(mockTieuChiDanhGiaSearchRepository, times(1)).save(testTieuChiDanhGia);
    }

    @Test
    @Transactional
    public void createTieuChiDanhGiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tieuChiDanhGiaRepository.findAll().size();

        // Create the TieuChiDanhGia with an existing ID
        tieuChiDanhGia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTieuChiDanhGiaMockMvc.perform(post("/api/tieu-chi-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tieuChiDanhGia)))
            .andExpect(status().isBadRequest());

        // Validate the TieuChiDanhGia in the database
        List<TieuChiDanhGia> tieuChiDanhGiaList = tieuChiDanhGiaRepository.findAll();
        assertThat(tieuChiDanhGiaList).hasSize(databaseSizeBeforeCreate);

        // Validate the TieuChiDanhGia in Elasticsearch
        verify(mockTieuChiDanhGiaSearchRepository, times(0)).save(tieuChiDanhGia);
    }

    @Test
    @Transactional
    public void getAllTieuChiDanhGias() throws Exception {
        // Initialize the database
        tieuChiDanhGiaRepository.saveAndFlush(tieuChiDanhGia);

        // Get all the tieuChiDanhGiaList
        restTieuChiDanhGiaMockMvc.perform(get("/api/tieu-chi-danh-gias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tieuChiDanhGia.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }
    

    @Test
    @Transactional
    public void getTieuChiDanhGia() throws Exception {
        // Initialize the database
        tieuChiDanhGiaRepository.saveAndFlush(tieuChiDanhGia);

        // Get the tieuChiDanhGia
        restTieuChiDanhGiaMockMvc.perform(get("/api/tieu-chi-danh-gias/{id}", tieuChiDanhGia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tieuChiDanhGia.getId().intValue()))
            .andExpect(jsonPath("$.noiDung").value(DEFAULT_NOI_DUNG.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingTieuChiDanhGia() throws Exception {
        // Get the tieuChiDanhGia
        restTieuChiDanhGiaMockMvc.perform(get("/api/tieu-chi-danh-gias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTieuChiDanhGia() throws Exception {
        // Initialize the database
        tieuChiDanhGiaService.save(tieuChiDanhGia);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTieuChiDanhGiaSearchRepository);

        int databaseSizeBeforeUpdate = tieuChiDanhGiaRepository.findAll().size();

        // Update the tieuChiDanhGia
        TieuChiDanhGia updatedTieuChiDanhGia = tieuChiDanhGiaRepository.findById(tieuChiDanhGia.getId()).get();
        // Disconnect from session so that the updates on updatedTieuChiDanhGia are not directly saved in db
        em.detach(updatedTieuChiDanhGia);
        updatedTieuChiDanhGia
            .noiDung(UPDATED_NOI_DUNG)
            .level(UPDATED_LEVEL);

        restTieuChiDanhGiaMockMvc.perform(put("/api/tieu-chi-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTieuChiDanhGia)))
            .andExpect(status().isOk());

        // Validate the TieuChiDanhGia in the database
        List<TieuChiDanhGia> tieuChiDanhGiaList = tieuChiDanhGiaRepository.findAll();
        assertThat(tieuChiDanhGiaList).hasSize(databaseSizeBeforeUpdate);
        TieuChiDanhGia testTieuChiDanhGia = tieuChiDanhGiaList.get(tieuChiDanhGiaList.size() - 1);
        assertThat(testTieuChiDanhGia.getNoiDung()).isEqualTo(UPDATED_NOI_DUNG);
        assertThat(testTieuChiDanhGia.getLevel()).isEqualTo(UPDATED_LEVEL);

        // Validate the TieuChiDanhGia in Elasticsearch
        verify(mockTieuChiDanhGiaSearchRepository, times(1)).save(testTieuChiDanhGia);
    }

    @Test
    @Transactional
    public void updateNonExistingTieuChiDanhGia() throws Exception {
        int databaseSizeBeforeUpdate = tieuChiDanhGiaRepository.findAll().size();

        // Create the TieuChiDanhGia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTieuChiDanhGiaMockMvc.perform(put("/api/tieu-chi-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tieuChiDanhGia)))
            .andExpect(status().isBadRequest());

        // Validate the TieuChiDanhGia in the database
        List<TieuChiDanhGia> tieuChiDanhGiaList = tieuChiDanhGiaRepository.findAll();
        assertThat(tieuChiDanhGiaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TieuChiDanhGia in Elasticsearch
        verify(mockTieuChiDanhGiaSearchRepository, times(0)).save(tieuChiDanhGia);
    }

    @Test
    @Transactional
    public void deleteTieuChiDanhGia() throws Exception {
        // Initialize the database
        tieuChiDanhGiaService.save(tieuChiDanhGia);

        int databaseSizeBeforeDelete = tieuChiDanhGiaRepository.findAll().size();

        // Get the tieuChiDanhGia
        restTieuChiDanhGiaMockMvc.perform(delete("/api/tieu-chi-danh-gias/{id}", tieuChiDanhGia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TieuChiDanhGia> tieuChiDanhGiaList = tieuChiDanhGiaRepository.findAll();
        assertThat(tieuChiDanhGiaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TieuChiDanhGia in Elasticsearch
        verify(mockTieuChiDanhGiaSearchRepository, times(1)).deleteById(tieuChiDanhGia.getId());
    }

    @Test
    @Transactional
    public void searchTieuChiDanhGia() throws Exception {
        // Initialize the database
        tieuChiDanhGiaService.save(tieuChiDanhGia);
        when(mockTieuChiDanhGiaSearchRepository.search(queryStringQuery("id:" + tieuChiDanhGia.getId())))
            .thenReturn(Collections.singletonList(tieuChiDanhGia));
        // Search the tieuChiDanhGia
        restTieuChiDanhGiaMockMvc.perform(get("/api/_search/tieu-chi-danh-gias?query=id:" + tieuChiDanhGia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tieuChiDanhGia.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TieuChiDanhGia.class);
        TieuChiDanhGia tieuChiDanhGia1 = new TieuChiDanhGia();
        tieuChiDanhGia1.setId(1L);
        TieuChiDanhGia tieuChiDanhGia2 = new TieuChiDanhGia();
        tieuChiDanhGia2.setId(tieuChiDanhGia1.getId());
        assertThat(tieuChiDanhGia1).isEqualTo(tieuChiDanhGia2);
        tieuChiDanhGia2.setId(2L);
        assertThat(tieuChiDanhGia1).isNotEqualTo(tieuChiDanhGia2);
        tieuChiDanhGia1.setId(null);
        assertThat(tieuChiDanhGia1).isNotEqualTo(tieuChiDanhGia2);
    }
}
