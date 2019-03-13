package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.TheLoaiTieuChi;
import com.mycompany.myapp.repository.TheLoaiTieuChiRepository;
import com.mycompany.myapp.repository.search.TheLoaiTieuChiSearchRepository;
import com.mycompany.myapp.service.TheLoaiTieuChiService;
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
 * Test class for the TheLoaiTieuChiResource REST controller.
 *
 * @see TheLoaiTieuChiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TheLoaiTieuChiResourceIntTest {

    private static final String DEFAULT_NOI_DUNG = "AAAAAAAAAA";
    private static final String UPDATED_NOI_DUNG = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    @Autowired
    private TheLoaiTieuChiRepository theLoaiTieuChiRepository;

    

    @Autowired
    private TheLoaiTieuChiService theLoaiTieuChiService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TheLoaiTieuChiSearchRepositoryMockConfiguration
     */
    @Autowired
    private TheLoaiTieuChiSearchRepository mockTheLoaiTieuChiSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheLoaiTieuChiMockMvc;

    private TheLoaiTieuChi theLoaiTieuChi;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheLoaiTieuChiResource theLoaiTieuChiResource = new TheLoaiTieuChiResource(theLoaiTieuChiService);
        this.restTheLoaiTieuChiMockMvc = MockMvcBuilders.standaloneSetup(theLoaiTieuChiResource)
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
    public static TheLoaiTieuChi createEntity(EntityManager em) {
        TheLoaiTieuChi theLoaiTieuChi = new TheLoaiTieuChi()
            .noiDung(DEFAULT_NOI_DUNG)
            .level(DEFAULT_LEVEL);
        return theLoaiTieuChi;
    }

    @Before
    public void initTest() {
        theLoaiTieuChi = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheLoaiTieuChi() throws Exception {
        int databaseSizeBeforeCreate = theLoaiTieuChiRepository.findAll().size();

        // Create the TheLoaiTieuChi
        restTheLoaiTieuChiMockMvc.perform(post("/api/the-loai-tieu-chis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTieuChi)))
            .andExpect(status().isCreated());

        // Validate the TheLoaiTieuChi in the database
        List<TheLoaiTieuChi> theLoaiTieuChiList = theLoaiTieuChiRepository.findAll();
        assertThat(theLoaiTieuChiList).hasSize(databaseSizeBeforeCreate + 1);
        TheLoaiTieuChi testTheLoaiTieuChi = theLoaiTieuChiList.get(theLoaiTieuChiList.size() - 1);
        assertThat(testTheLoaiTieuChi.getNoiDung()).isEqualTo(DEFAULT_NOI_DUNG);
        assertThat(testTheLoaiTieuChi.getLevel()).isEqualTo(DEFAULT_LEVEL);

        // Validate the TheLoaiTieuChi in Elasticsearch
        verify(mockTheLoaiTieuChiSearchRepository, times(1)).save(testTheLoaiTieuChi);
    }

    @Test
    @Transactional
    public void createTheLoaiTieuChiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theLoaiTieuChiRepository.findAll().size();

        // Create the TheLoaiTieuChi with an existing ID
        theLoaiTieuChi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheLoaiTieuChiMockMvc.perform(post("/api/the-loai-tieu-chis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTieuChi)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiTieuChi in the database
        List<TheLoaiTieuChi> theLoaiTieuChiList = theLoaiTieuChiRepository.findAll();
        assertThat(theLoaiTieuChiList).hasSize(databaseSizeBeforeCreate);

        // Validate the TheLoaiTieuChi in Elasticsearch
        verify(mockTheLoaiTieuChiSearchRepository, times(0)).save(theLoaiTieuChi);
    }

    @Test
    @Transactional
    public void getAllTheLoaiTieuChis() throws Exception {
        // Initialize the database
        theLoaiTieuChiRepository.saveAndFlush(theLoaiTieuChi);

        // Get all the theLoaiTieuChiList
        restTheLoaiTieuChiMockMvc.perform(get("/api/the-loai-tieu-chis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiTieuChi.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }
    

    @Test
    @Transactional
    public void getTheLoaiTieuChi() throws Exception {
        // Initialize the database
        theLoaiTieuChiRepository.saveAndFlush(theLoaiTieuChi);

        // Get the theLoaiTieuChi
        restTheLoaiTieuChiMockMvc.perform(get("/api/the-loai-tieu-chis/{id}", theLoaiTieuChi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theLoaiTieuChi.getId().intValue()))
            .andExpect(jsonPath("$.noiDung").value(DEFAULT_NOI_DUNG.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingTheLoaiTieuChi() throws Exception {
        // Get the theLoaiTieuChi
        restTheLoaiTieuChiMockMvc.perform(get("/api/the-loai-tieu-chis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheLoaiTieuChi() throws Exception {
        // Initialize the database
        theLoaiTieuChiService.save(theLoaiTieuChi);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTheLoaiTieuChiSearchRepository);

        int databaseSizeBeforeUpdate = theLoaiTieuChiRepository.findAll().size();

        // Update the theLoaiTieuChi
        TheLoaiTieuChi updatedTheLoaiTieuChi = theLoaiTieuChiRepository.findById(theLoaiTieuChi.getId()).get();
        // Disconnect from session so that the updates on updatedTheLoaiTieuChi are not directly saved in db
        em.detach(updatedTheLoaiTieuChi);
        updatedTheLoaiTieuChi
            .noiDung(UPDATED_NOI_DUNG)
            .level(UPDATED_LEVEL);

        restTheLoaiTieuChiMockMvc.perform(put("/api/the-loai-tieu-chis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheLoaiTieuChi)))
            .andExpect(status().isOk());

        // Validate the TheLoaiTieuChi in the database
        List<TheLoaiTieuChi> theLoaiTieuChiList = theLoaiTieuChiRepository.findAll();
        assertThat(theLoaiTieuChiList).hasSize(databaseSizeBeforeUpdate);
        TheLoaiTieuChi testTheLoaiTieuChi = theLoaiTieuChiList.get(theLoaiTieuChiList.size() - 1);
        assertThat(testTheLoaiTieuChi.getNoiDung()).isEqualTo(UPDATED_NOI_DUNG);
        assertThat(testTheLoaiTieuChi.getLevel()).isEqualTo(UPDATED_LEVEL);

        // Validate the TheLoaiTieuChi in Elasticsearch
        verify(mockTheLoaiTieuChiSearchRepository, times(1)).save(testTheLoaiTieuChi);
    }

    @Test
    @Transactional
    public void updateNonExistingTheLoaiTieuChi() throws Exception {
        int databaseSizeBeforeUpdate = theLoaiTieuChiRepository.findAll().size();

        // Create the TheLoaiTieuChi

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheLoaiTieuChiMockMvc.perform(put("/api/the-loai-tieu-chis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTieuChi)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiTieuChi in the database
        List<TheLoaiTieuChi> theLoaiTieuChiList = theLoaiTieuChiRepository.findAll();
        assertThat(theLoaiTieuChiList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TheLoaiTieuChi in Elasticsearch
        verify(mockTheLoaiTieuChiSearchRepository, times(0)).save(theLoaiTieuChi);
    }

    @Test
    @Transactional
    public void deleteTheLoaiTieuChi() throws Exception {
        // Initialize the database
        theLoaiTieuChiService.save(theLoaiTieuChi);

        int databaseSizeBeforeDelete = theLoaiTieuChiRepository.findAll().size();

        // Get the theLoaiTieuChi
        restTheLoaiTieuChiMockMvc.perform(delete("/api/the-loai-tieu-chis/{id}", theLoaiTieuChi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheLoaiTieuChi> theLoaiTieuChiList = theLoaiTieuChiRepository.findAll();
        assertThat(theLoaiTieuChiList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TheLoaiTieuChi in Elasticsearch
        verify(mockTheLoaiTieuChiSearchRepository, times(1)).deleteById(theLoaiTieuChi.getId());
    }

    @Test
    @Transactional
    public void searchTheLoaiTieuChi() throws Exception {
        // Initialize the database
        theLoaiTieuChiService.save(theLoaiTieuChi);
        when(mockTheLoaiTieuChiSearchRepository.search(queryStringQuery("id:" + theLoaiTieuChi.getId())))
            .thenReturn(Collections.singletonList(theLoaiTieuChi));
        // Search the theLoaiTieuChi
        restTheLoaiTieuChiMockMvc.perform(get("/api/_search/the-loai-tieu-chis?query=id:" + theLoaiTieuChi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiTieuChi.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheLoaiTieuChi.class);
        TheLoaiTieuChi theLoaiTieuChi1 = new TheLoaiTieuChi();
        theLoaiTieuChi1.setId(1L);
        TheLoaiTieuChi theLoaiTieuChi2 = new TheLoaiTieuChi();
        theLoaiTieuChi2.setId(theLoaiTieuChi1.getId());
        assertThat(theLoaiTieuChi1).isEqualTo(theLoaiTieuChi2);
        theLoaiTieuChi2.setId(2L);
        assertThat(theLoaiTieuChi1).isNotEqualTo(theLoaiTieuChi2);
        theLoaiTieuChi1.setId(null);
        assertThat(theLoaiTieuChi1).isNotEqualTo(theLoaiTieuChi2);
    }
}
