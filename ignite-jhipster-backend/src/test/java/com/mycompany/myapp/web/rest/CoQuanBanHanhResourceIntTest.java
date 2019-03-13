package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.CoQuanBanHanh;
import com.mycompany.myapp.repository.CoQuanBanHanhRepository;
import com.mycompany.myapp.repository.search.CoQuanBanHanhSearchRepository;
import com.mycompany.myapp.service.CoQuanBanHanhService;
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
 * Test class for the CoQuanBanHanhResource REST controller.
 *
 * @see CoQuanBanHanhResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CoQuanBanHanhResourceIntTest {

    private static final String DEFAULT_TEN_CO_QUAN = "AAAAAAAAAA";
    private static final String UPDATED_TEN_CO_QUAN = "BBBBBBBBBB";

    @Autowired
    private CoQuanBanHanhRepository coQuanBanHanhRepository;

    

    @Autowired
    private CoQuanBanHanhService coQuanBanHanhService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CoQuanBanHanhSearchRepositoryMockConfiguration
     */
    @Autowired
    private CoQuanBanHanhSearchRepository mockCoQuanBanHanhSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCoQuanBanHanhMockMvc;

    private CoQuanBanHanh coQuanBanHanh;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoQuanBanHanhResource coQuanBanHanhResource = new CoQuanBanHanhResource(coQuanBanHanhService);
        this.restCoQuanBanHanhMockMvc = MockMvcBuilders.standaloneSetup(coQuanBanHanhResource)
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
    public static CoQuanBanHanh createEntity(EntityManager em) {
        CoQuanBanHanh coQuanBanHanh = new CoQuanBanHanh()
            .tenCoQuan(DEFAULT_TEN_CO_QUAN);
        return coQuanBanHanh;
    }

    @Before
    public void initTest() {
        coQuanBanHanh = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoQuanBanHanh() throws Exception {
        int databaseSizeBeforeCreate = coQuanBanHanhRepository.findAll().size();

        // Create the CoQuanBanHanh
        restCoQuanBanHanhMockMvc.perform(post("/api/co-quan-ban-hanhs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coQuanBanHanh)))
            .andExpect(status().isCreated());

        // Validate the CoQuanBanHanh in the database
        List<CoQuanBanHanh> coQuanBanHanhList = coQuanBanHanhRepository.findAll();
        assertThat(coQuanBanHanhList).hasSize(databaseSizeBeforeCreate + 1);
        CoQuanBanHanh testCoQuanBanHanh = coQuanBanHanhList.get(coQuanBanHanhList.size() - 1);
        assertThat(testCoQuanBanHanh.getTenCoQuan()).isEqualTo(DEFAULT_TEN_CO_QUAN);

        // Validate the CoQuanBanHanh in Elasticsearch
        verify(mockCoQuanBanHanhSearchRepository, times(1)).save(testCoQuanBanHanh);
    }

    @Test
    @Transactional
    public void createCoQuanBanHanhWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coQuanBanHanhRepository.findAll().size();

        // Create the CoQuanBanHanh with an existing ID
        coQuanBanHanh.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoQuanBanHanhMockMvc.perform(post("/api/co-quan-ban-hanhs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coQuanBanHanh)))
            .andExpect(status().isBadRequest());

        // Validate the CoQuanBanHanh in the database
        List<CoQuanBanHanh> coQuanBanHanhList = coQuanBanHanhRepository.findAll();
        assertThat(coQuanBanHanhList).hasSize(databaseSizeBeforeCreate);

        // Validate the CoQuanBanHanh in Elasticsearch
        verify(mockCoQuanBanHanhSearchRepository, times(0)).save(coQuanBanHanh);
    }

    @Test
    @Transactional
    public void getAllCoQuanBanHanhs() throws Exception {
        // Initialize the database
        coQuanBanHanhRepository.saveAndFlush(coQuanBanHanh);

        // Get all the coQuanBanHanhList
        restCoQuanBanHanhMockMvc.perform(get("/api/co-quan-ban-hanhs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coQuanBanHanh.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenCoQuan").value(hasItem(DEFAULT_TEN_CO_QUAN.toString())));
    }
    

    @Test
    @Transactional
    public void getCoQuanBanHanh() throws Exception {
        // Initialize the database
        coQuanBanHanhRepository.saveAndFlush(coQuanBanHanh);

        // Get the coQuanBanHanh
        restCoQuanBanHanhMockMvc.perform(get("/api/co-quan-ban-hanhs/{id}", coQuanBanHanh.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coQuanBanHanh.getId().intValue()))
            .andExpect(jsonPath("$.tenCoQuan").value(DEFAULT_TEN_CO_QUAN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCoQuanBanHanh() throws Exception {
        // Get the coQuanBanHanh
        restCoQuanBanHanhMockMvc.perform(get("/api/co-quan-ban-hanhs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoQuanBanHanh() throws Exception {
        // Initialize the database
        coQuanBanHanhService.save(coQuanBanHanh);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockCoQuanBanHanhSearchRepository);

        int databaseSizeBeforeUpdate = coQuanBanHanhRepository.findAll().size();

        // Update the coQuanBanHanh
        CoQuanBanHanh updatedCoQuanBanHanh = coQuanBanHanhRepository.findById(coQuanBanHanh.getId()).get();
        // Disconnect from session so that the updates on updatedCoQuanBanHanh are not directly saved in db
        em.detach(updatedCoQuanBanHanh);
        updatedCoQuanBanHanh
            .tenCoQuan(UPDATED_TEN_CO_QUAN);

        restCoQuanBanHanhMockMvc.perform(put("/api/co-quan-ban-hanhs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoQuanBanHanh)))
            .andExpect(status().isOk());

        // Validate the CoQuanBanHanh in the database
        List<CoQuanBanHanh> coQuanBanHanhList = coQuanBanHanhRepository.findAll();
        assertThat(coQuanBanHanhList).hasSize(databaseSizeBeforeUpdate);
        CoQuanBanHanh testCoQuanBanHanh = coQuanBanHanhList.get(coQuanBanHanhList.size() - 1);
        assertThat(testCoQuanBanHanh.getTenCoQuan()).isEqualTo(UPDATED_TEN_CO_QUAN);

        // Validate the CoQuanBanHanh in Elasticsearch
        verify(mockCoQuanBanHanhSearchRepository, times(1)).save(testCoQuanBanHanh);
    }

    @Test
    @Transactional
    public void updateNonExistingCoQuanBanHanh() throws Exception {
        int databaseSizeBeforeUpdate = coQuanBanHanhRepository.findAll().size();

        // Create the CoQuanBanHanh

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCoQuanBanHanhMockMvc.perform(put("/api/co-quan-ban-hanhs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coQuanBanHanh)))
            .andExpect(status().isBadRequest());

        // Validate the CoQuanBanHanh in the database
        List<CoQuanBanHanh> coQuanBanHanhList = coQuanBanHanhRepository.findAll();
        assertThat(coQuanBanHanhList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CoQuanBanHanh in Elasticsearch
        verify(mockCoQuanBanHanhSearchRepository, times(0)).save(coQuanBanHanh);
    }

    @Test
    @Transactional
    public void deleteCoQuanBanHanh() throws Exception {
        // Initialize the database
        coQuanBanHanhService.save(coQuanBanHanh);

        int databaseSizeBeforeDelete = coQuanBanHanhRepository.findAll().size();

        // Get the coQuanBanHanh
        restCoQuanBanHanhMockMvc.perform(delete("/api/co-quan-ban-hanhs/{id}", coQuanBanHanh.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CoQuanBanHanh> coQuanBanHanhList = coQuanBanHanhRepository.findAll();
        assertThat(coQuanBanHanhList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CoQuanBanHanh in Elasticsearch
        verify(mockCoQuanBanHanhSearchRepository, times(1)).deleteById(coQuanBanHanh.getId());
    }

    @Test
    @Transactional
    public void searchCoQuanBanHanh() throws Exception {
        // Initialize the database
        coQuanBanHanhService.save(coQuanBanHanh);
        when(mockCoQuanBanHanhSearchRepository.search(queryStringQuery("id:" + coQuanBanHanh.getId())))
            .thenReturn(Collections.singletonList(coQuanBanHanh));
        // Search the coQuanBanHanh
        restCoQuanBanHanhMockMvc.perform(get("/api/_search/co-quan-ban-hanhs?query=id:" + coQuanBanHanh.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coQuanBanHanh.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenCoQuan").value(hasItem(DEFAULT_TEN_CO_QUAN.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoQuanBanHanh.class);
        CoQuanBanHanh coQuanBanHanh1 = new CoQuanBanHanh();
        coQuanBanHanh1.setId(1L);
        CoQuanBanHanh coQuanBanHanh2 = new CoQuanBanHanh();
        coQuanBanHanh2.setId(coQuanBanHanh1.getId());
        assertThat(coQuanBanHanh1).isEqualTo(coQuanBanHanh2);
        coQuanBanHanh2.setId(2L);
        assertThat(coQuanBanHanh1).isNotEqualTo(coQuanBanHanh2);
        coQuanBanHanh1.setId(null);
        assertThat(coQuanBanHanh1).isNotEqualTo(coQuanBanHanh2);
    }
}
