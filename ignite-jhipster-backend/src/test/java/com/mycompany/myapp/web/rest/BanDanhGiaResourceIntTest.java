package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.BanDanhGia;
import com.mycompany.myapp.repository.BanDanhGiaRepository;
import com.mycompany.myapp.repository.search.BanDanhGiaSearchRepository;
import com.mycompany.myapp.service.BanDanhGiaService;
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
 * Test class for the BanDanhGiaResource REST controller.
 *
 * @see BanDanhGiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class BanDanhGiaResourceIntTest {

    private static final String DEFAULT_MO_TA = "AAAAAAAAAA";
    private static final String UPDATED_MO_TA = "BBBBBBBBBB";

    @Autowired
    private BanDanhGiaRepository banDanhGiaRepository;

    

    @Autowired
    private BanDanhGiaService banDanhGiaService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.BanDanhGiaSearchRepositoryMockConfiguration
     */
    @Autowired
    private BanDanhGiaSearchRepository mockBanDanhGiaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBanDanhGiaMockMvc;

    private BanDanhGia banDanhGia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BanDanhGiaResource banDanhGiaResource = new BanDanhGiaResource(banDanhGiaService);
        this.restBanDanhGiaMockMvc = MockMvcBuilders.standaloneSetup(banDanhGiaResource)
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
    public static BanDanhGia createEntity(EntityManager em) {
        BanDanhGia banDanhGia = new BanDanhGia()
            .moTa(DEFAULT_MO_TA);
        return banDanhGia;
    }

    @Before
    public void initTest() {
        banDanhGia = createEntity(em);
    }

    @Test
    @Transactional
    public void createBanDanhGia() throws Exception {
        int databaseSizeBeforeCreate = banDanhGiaRepository.findAll().size();

        // Create the BanDanhGia
        restBanDanhGiaMockMvc.perform(post("/api/ban-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banDanhGia)))
            .andExpect(status().isCreated());

        // Validate the BanDanhGia in the database
        List<BanDanhGia> banDanhGiaList = banDanhGiaRepository.findAll();
        assertThat(banDanhGiaList).hasSize(databaseSizeBeforeCreate + 1);
        BanDanhGia testBanDanhGia = banDanhGiaList.get(banDanhGiaList.size() - 1);
        assertThat(testBanDanhGia.getMoTa()).isEqualTo(DEFAULT_MO_TA);

        // Validate the BanDanhGia in Elasticsearch
        verify(mockBanDanhGiaSearchRepository, times(1)).save(testBanDanhGia);
    }

    @Test
    @Transactional
    public void createBanDanhGiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = banDanhGiaRepository.findAll().size();

        // Create the BanDanhGia with an existing ID
        banDanhGia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBanDanhGiaMockMvc.perform(post("/api/ban-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banDanhGia)))
            .andExpect(status().isBadRequest());

        // Validate the BanDanhGia in the database
        List<BanDanhGia> banDanhGiaList = banDanhGiaRepository.findAll();
        assertThat(banDanhGiaList).hasSize(databaseSizeBeforeCreate);

        // Validate the BanDanhGia in Elasticsearch
        verify(mockBanDanhGiaSearchRepository, times(0)).save(banDanhGia);
    }

    @Test
    @Transactional
    public void getAllBanDanhGias() throws Exception {
        // Initialize the database
        banDanhGiaRepository.saveAndFlush(banDanhGia);

        // Get all the banDanhGiaList
        restBanDanhGiaMockMvc.perform(get("/api/ban-danh-gias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banDanhGia.getId().intValue())))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA.toString())));
    }
    

    @Test
    @Transactional
    public void getBanDanhGia() throws Exception {
        // Initialize the database
        banDanhGiaRepository.saveAndFlush(banDanhGia);

        // Get the banDanhGia
        restBanDanhGiaMockMvc.perform(get("/api/ban-danh-gias/{id}", banDanhGia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(banDanhGia.getId().intValue()))
            .andExpect(jsonPath("$.moTa").value(DEFAULT_MO_TA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBanDanhGia() throws Exception {
        // Get the banDanhGia
        restBanDanhGiaMockMvc.perform(get("/api/ban-danh-gias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBanDanhGia() throws Exception {
        // Initialize the database
        banDanhGiaService.save(banDanhGia);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockBanDanhGiaSearchRepository);

        int databaseSizeBeforeUpdate = banDanhGiaRepository.findAll().size();

        // Update the banDanhGia
        BanDanhGia updatedBanDanhGia = banDanhGiaRepository.findById(banDanhGia.getId()).get();
        // Disconnect from session so that the updates on updatedBanDanhGia are not directly saved in db
        em.detach(updatedBanDanhGia);
        updatedBanDanhGia
            .moTa(UPDATED_MO_TA);

        restBanDanhGiaMockMvc.perform(put("/api/ban-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBanDanhGia)))
            .andExpect(status().isOk());

        // Validate the BanDanhGia in the database
        List<BanDanhGia> banDanhGiaList = banDanhGiaRepository.findAll();
        assertThat(banDanhGiaList).hasSize(databaseSizeBeforeUpdate);
        BanDanhGia testBanDanhGia = banDanhGiaList.get(banDanhGiaList.size() - 1);
        assertThat(testBanDanhGia.getMoTa()).isEqualTo(UPDATED_MO_TA);

        // Validate the BanDanhGia in Elasticsearch
        verify(mockBanDanhGiaSearchRepository, times(1)).save(testBanDanhGia);
    }

    @Test
    @Transactional
    public void updateNonExistingBanDanhGia() throws Exception {
        int databaseSizeBeforeUpdate = banDanhGiaRepository.findAll().size();

        // Create the BanDanhGia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBanDanhGiaMockMvc.perform(put("/api/ban-danh-gias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banDanhGia)))
            .andExpect(status().isBadRequest());

        // Validate the BanDanhGia in the database
        List<BanDanhGia> banDanhGiaList = banDanhGiaRepository.findAll();
        assertThat(banDanhGiaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the BanDanhGia in Elasticsearch
        verify(mockBanDanhGiaSearchRepository, times(0)).save(banDanhGia);
    }

    @Test
    @Transactional
    public void deleteBanDanhGia() throws Exception {
        // Initialize the database
        banDanhGiaService.save(banDanhGia);

        int databaseSizeBeforeDelete = banDanhGiaRepository.findAll().size();

        // Get the banDanhGia
        restBanDanhGiaMockMvc.perform(delete("/api/ban-danh-gias/{id}", banDanhGia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BanDanhGia> banDanhGiaList = banDanhGiaRepository.findAll();
        assertThat(banDanhGiaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the BanDanhGia in Elasticsearch
        verify(mockBanDanhGiaSearchRepository, times(1)).deleteById(banDanhGia.getId());
    }

    @Test
    @Transactional
    public void searchBanDanhGia() throws Exception {
        // Initialize the database
        banDanhGiaService.save(banDanhGia);
        when(mockBanDanhGiaSearchRepository.search(queryStringQuery("id:" + banDanhGia.getId())))
            .thenReturn(Collections.singletonList(banDanhGia));
        // Search the banDanhGia
        restBanDanhGiaMockMvc.perform(get("/api/_search/ban-danh-gias?query=id:" + banDanhGia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banDanhGia.getId().intValue())))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BanDanhGia.class);
        BanDanhGia banDanhGia1 = new BanDanhGia();
        banDanhGia1.setId(1L);
        BanDanhGia banDanhGia2 = new BanDanhGia();
        banDanhGia2.setId(banDanhGia1.getId());
        assertThat(banDanhGia1).isEqualTo(banDanhGia2);
        banDanhGia2.setId(2L);
        assertThat(banDanhGia1).isNotEqualTo(banDanhGia2);
        banDanhGia1.setId(null);
        assertThat(banDanhGia1).isNotEqualTo(banDanhGia2);
    }
}
