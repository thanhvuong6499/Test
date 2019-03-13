package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.CauTraLoi;
import com.mycompany.myapp.repository.CauTraLoiRepository;
import com.mycompany.myapp.repository.search.CauTraLoiSearchRepository;
import com.mycompany.myapp.service.CauTraLoiService;
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

import com.mycompany.myapp.domain.enumeration.MucDiem;
/**
 * Test class for the CauTraLoiResource REST controller.
 *
 * @see CauTraLoiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CauTraLoiResourceIntTest {

    private static final MucDiem DEFAULT_THANG_DIEM = MucDiem.CHUADAT;
    private static final MucDiem UPDATED_THANG_DIEM = MucDiem.DAT;

    @Autowired
    private CauTraLoiRepository cauTraLoiRepository;

    

    @Autowired
    private CauTraLoiService cauTraLoiService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CauTraLoiSearchRepositoryMockConfiguration
     */
    @Autowired
    private CauTraLoiSearchRepository mockCauTraLoiSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCauTraLoiMockMvc;

    private CauTraLoi cauTraLoi;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CauTraLoiResource cauTraLoiResource = new CauTraLoiResource(cauTraLoiService);
        this.restCauTraLoiMockMvc = MockMvcBuilders.standaloneSetup(cauTraLoiResource)
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
    public static CauTraLoi createEntity(EntityManager em) {
        CauTraLoi cauTraLoi = new CauTraLoi()
            .thangDiem(DEFAULT_THANG_DIEM);
        return cauTraLoi;
    }

    @Before
    public void initTest() {
        cauTraLoi = createEntity(em);
    }

    @Test
    @Transactional
    public void createCauTraLoi() throws Exception {
        int databaseSizeBeforeCreate = cauTraLoiRepository.findAll().size();

        // Create the CauTraLoi
        restCauTraLoiMockMvc.perform(post("/api/cau-tra-lois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauTraLoi)))
            .andExpect(status().isCreated());

        // Validate the CauTraLoi in the database
        List<CauTraLoi> cauTraLoiList = cauTraLoiRepository.findAll();
        assertThat(cauTraLoiList).hasSize(databaseSizeBeforeCreate + 1);
        CauTraLoi testCauTraLoi = cauTraLoiList.get(cauTraLoiList.size() - 1);
        assertThat(testCauTraLoi.getThangDiem()).isEqualTo(DEFAULT_THANG_DIEM);

        // Validate the CauTraLoi in Elasticsearch
        verify(mockCauTraLoiSearchRepository, times(1)).save(testCauTraLoi);
    }

    @Test
    @Transactional
    public void createCauTraLoiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cauTraLoiRepository.findAll().size();

        // Create the CauTraLoi with an existing ID
        cauTraLoi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCauTraLoiMockMvc.perform(post("/api/cau-tra-lois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauTraLoi)))
            .andExpect(status().isBadRequest());

        // Validate the CauTraLoi in the database
        List<CauTraLoi> cauTraLoiList = cauTraLoiRepository.findAll();
        assertThat(cauTraLoiList).hasSize(databaseSizeBeforeCreate);

        // Validate the CauTraLoi in Elasticsearch
        verify(mockCauTraLoiSearchRepository, times(0)).save(cauTraLoi);
    }

    @Test
    @Transactional
    public void getAllCauTraLois() throws Exception {
        // Initialize the database
        cauTraLoiRepository.saveAndFlush(cauTraLoi);

        // Get all the cauTraLoiList
        restCauTraLoiMockMvc.perform(get("/api/cau-tra-lois?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cauTraLoi.getId().intValue())))
            .andExpect(jsonPath("$.[*].thangDiem").value(hasItem(DEFAULT_THANG_DIEM.toString())));
    }
    

    @Test
    @Transactional
    public void getCauTraLoi() throws Exception {
        // Initialize the database
        cauTraLoiRepository.saveAndFlush(cauTraLoi);

        // Get the cauTraLoi
        restCauTraLoiMockMvc.perform(get("/api/cau-tra-lois/{id}", cauTraLoi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cauTraLoi.getId().intValue()))
            .andExpect(jsonPath("$.thangDiem").value(DEFAULT_THANG_DIEM.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCauTraLoi() throws Exception {
        // Get the cauTraLoi
        restCauTraLoiMockMvc.perform(get("/api/cau-tra-lois/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCauTraLoi() throws Exception {
        // Initialize the database
        cauTraLoiService.save(cauTraLoi);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockCauTraLoiSearchRepository);

        int databaseSizeBeforeUpdate = cauTraLoiRepository.findAll().size();

        // Update the cauTraLoi
        CauTraLoi updatedCauTraLoi = cauTraLoiRepository.findById(cauTraLoi.getId()).get();
        // Disconnect from session so that the updates on updatedCauTraLoi are not directly saved in db
        em.detach(updatedCauTraLoi);
        updatedCauTraLoi
            .thangDiem(UPDATED_THANG_DIEM);

        restCauTraLoiMockMvc.perform(put("/api/cau-tra-lois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCauTraLoi)))
            .andExpect(status().isOk());

        // Validate the CauTraLoi in the database
        List<CauTraLoi> cauTraLoiList = cauTraLoiRepository.findAll();
        assertThat(cauTraLoiList).hasSize(databaseSizeBeforeUpdate);
        CauTraLoi testCauTraLoi = cauTraLoiList.get(cauTraLoiList.size() - 1);
        assertThat(testCauTraLoi.getThangDiem()).isEqualTo(UPDATED_THANG_DIEM);

        // Validate the CauTraLoi in Elasticsearch
        verify(mockCauTraLoiSearchRepository, times(1)).save(testCauTraLoi);
    }

    @Test
    @Transactional
    public void updateNonExistingCauTraLoi() throws Exception {
        int databaseSizeBeforeUpdate = cauTraLoiRepository.findAll().size();

        // Create the CauTraLoi

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCauTraLoiMockMvc.perform(put("/api/cau-tra-lois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauTraLoi)))
            .andExpect(status().isBadRequest());

        // Validate the CauTraLoi in the database
        List<CauTraLoi> cauTraLoiList = cauTraLoiRepository.findAll();
        assertThat(cauTraLoiList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CauTraLoi in Elasticsearch
        verify(mockCauTraLoiSearchRepository, times(0)).save(cauTraLoi);
    }

    @Test
    @Transactional
    public void deleteCauTraLoi() throws Exception {
        // Initialize the database
        cauTraLoiService.save(cauTraLoi);

        int databaseSizeBeforeDelete = cauTraLoiRepository.findAll().size();

        // Get the cauTraLoi
        restCauTraLoiMockMvc.perform(delete("/api/cau-tra-lois/{id}", cauTraLoi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CauTraLoi> cauTraLoiList = cauTraLoiRepository.findAll();
        assertThat(cauTraLoiList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CauTraLoi in Elasticsearch
        verify(mockCauTraLoiSearchRepository, times(1)).deleteById(cauTraLoi.getId());
    }

    @Test
    @Transactional
    public void searchCauTraLoi() throws Exception {
        // Initialize the database
        cauTraLoiService.save(cauTraLoi);
        when(mockCauTraLoiSearchRepository.search(queryStringQuery("id:" + cauTraLoi.getId())))
            .thenReturn(Collections.singletonList(cauTraLoi));
        // Search the cauTraLoi
        restCauTraLoiMockMvc.perform(get("/api/_search/cau-tra-lois?query=id:" + cauTraLoi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cauTraLoi.getId().intValue())))
            .andExpect(jsonPath("$.[*].thangDiem").value(hasItem(DEFAULT_THANG_DIEM.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CauTraLoi.class);
        CauTraLoi cauTraLoi1 = new CauTraLoi();
        cauTraLoi1.setId(1L);
        CauTraLoi cauTraLoi2 = new CauTraLoi();
        cauTraLoi2.setId(cauTraLoi1.getId());
        assertThat(cauTraLoi1).isEqualTo(cauTraLoi2);
        cauTraLoi2.setId(2L);
        assertThat(cauTraLoi1).isNotEqualTo(cauTraLoi2);
        cauTraLoi1.setId(null);
        assertThat(cauTraLoi1).isNotEqualTo(cauTraLoi2);
    }
}
