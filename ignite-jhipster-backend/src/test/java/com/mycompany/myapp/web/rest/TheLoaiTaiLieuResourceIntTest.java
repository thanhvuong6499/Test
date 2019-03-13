package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.TheLoaiTaiLieu;
import com.mycompany.myapp.repository.TheLoaiTaiLieuRepository;
import com.mycompany.myapp.repository.search.TheLoaiTaiLieuSearchRepository;
import com.mycompany.myapp.service.TheLoaiTaiLieuService;
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
 * Test class for the TheLoaiTaiLieuResource REST controller.
 *
 * @see TheLoaiTaiLieuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TheLoaiTaiLieuResourceIntTest {

    private static final String DEFAULT_NOI_DUNG = "AAAAAAAAAA";
    private static final String UPDATED_NOI_DUNG = "BBBBBBBBBB";

    @Autowired
    private TheLoaiTaiLieuRepository theLoaiTaiLieuRepository;

    

    @Autowired
    private TheLoaiTaiLieuService theLoaiTaiLieuService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TheLoaiTaiLieuSearchRepositoryMockConfiguration
     */
    @Autowired
    private TheLoaiTaiLieuSearchRepository mockTheLoaiTaiLieuSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheLoaiTaiLieuMockMvc;

    private TheLoaiTaiLieu theLoaiTaiLieu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheLoaiTaiLieuResource theLoaiTaiLieuResource = new TheLoaiTaiLieuResource(theLoaiTaiLieuService);
        this.restTheLoaiTaiLieuMockMvc = MockMvcBuilders.standaloneSetup(theLoaiTaiLieuResource)
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
    public static TheLoaiTaiLieu createEntity(EntityManager em) {
        TheLoaiTaiLieu theLoaiTaiLieu = new TheLoaiTaiLieu()
            .noiDung(DEFAULT_NOI_DUNG);
        return theLoaiTaiLieu;
    }

    @Before
    public void initTest() {
        theLoaiTaiLieu = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheLoaiTaiLieu() throws Exception {
        int databaseSizeBeforeCreate = theLoaiTaiLieuRepository.findAll().size();

        // Create the TheLoaiTaiLieu
        restTheLoaiTaiLieuMockMvc.perform(post("/api/the-loai-tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTaiLieu)))
            .andExpect(status().isCreated());

        // Validate the TheLoaiTaiLieu in the database
        List<TheLoaiTaiLieu> theLoaiTaiLieuList = theLoaiTaiLieuRepository.findAll();
        assertThat(theLoaiTaiLieuList).hasSize(databaseSizeBeforeCreate + 1);
        TheLoaiTaiLieu testTheLoaiTaiLieu = theLoaiTaiLieuList.get(theLoaiTaiLieuList.size() - 1);
        assertThat(testTheLoaiTaiLieu.getNoiDung()).isEqualTo(DEFAULT_NOI_DUNG);

        // Validate the TheLoaiTaiLieu in Elasticsearch
        verify(mockTheLoaiTaiLieuSearchRepository, times(1)).save(testTheLoaiTaiLieu);
    }

    @Test
    @Transactional
    public void createTheLoaiTaiLieuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theLoaiTaiLieuRepository.findAll().size();

        // Create the TheLoaiTaiLieu with an existing ID
        theLoaiTaiLieu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheLoaiTaiLieuMockMvc.perform(post("/api/the-loai-tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTaiLieu)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiTaiLieu in the database
        List<TheLoaiTaiLieu> theLoaiTaiLieuList = theLoaiTaiLieuRepository.findAll();
        assertThat(theLoaiTaiLieuList).hasSize(databaseSizeBeforeCreate);

        // Validate the TheLoaiTaiLieu in Elasticsearch
        verify(mockTheLoaiTaiLieuSearchRepository, times(0)).save(theLoaiTaiLieu);
    }

    @Test
    @Transactional
    public void getAllTheLoaiTaiLieus() throws Exception {
        // Initialize the database
        theLoaiTaiLieuRepository.saveAndFlush(theLoaiTaiLieu);

        // Get all the theLoaiTaiLieuList
        restTheLoaiTaiLieuMockMvc.perform(get("/api/the-loai-tai-lieus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiTaiLieu.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())));
    }
    

    @Test
    @Transactional
    public void getTheLoaiTaiLieu() throws Exception {
        // Initialize the database
        theLoaiTaiLieuRepository.saveAndFlush(theLoaiTaiLieu);

        // Get the theLoaiTaiLieu
        restTheLoaiTaiLieuMockMvc.perform(get("/api/the-loai-tai-lieus/{id}", theLoaiTaiLieu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theLoaiTaiLieu.getId().intValue()))
            .andExpect(jsonPath("$.noiDung").value(DEFAULT_NOI_DUNG.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTheLoaiTaiLieu() throws Exception {
        // Get the theLoaiTaiLieu
        restTheLoaiTaiLieuMockMvc.perform(get("/api/the-loai-tai-lieus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheLoaiTaiLieu() throws Exception {
        // Initialize the database
        theLoaiTaiLieuService.save(theLoaiTaiLieu);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTheLoaiTaiLieuSearchRepository);

        int databaseSizeBeforeUpdate = theLoaiTaiLieuRepository.findAll().size();

        // Update the theLoaiTaiLieu
        TheLoaiTaiLieu updatedTheLoaiTaiLieu = theLoaiTaiLieuRepository.findById(theLoaiTaiLieu.getId()).get();
        // Disconnect from session so that the updates on updatedTheLoaiTaiLieu are not directly saved in db
        em.detach(updatedTheLoaiTaiLieu);
        updatedTheLoaiTaiLieu
            .noiDung(UPDATED_NOI_DUNG);

        restTheLoaiTaiLieuMockMvc.perform(put("/api/the-loai-tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheLoaiTaiLieu)))
            .andExpect(status().isOk());

        // Validate the TheLoaiTaiLieu in the database
        List<TheLoaiTaiLieu> theLoaiTaiLieuList = theLoaiTaiLieuRepository.findAll();
        assertThat(theLoaiTaiLieuList).hasSize(databaseSizeBeforeUpdate);
        TheLoaiTaiLieu testTheLoaiTaiLieu = theLoaiTaiLieuList.get(theLoaiTaiLieuList.size() - 1);
        assertThat(testTheLoaiTaiLieu.getNoiDung()).isEqualTo(UPDATED_NOI_DUNG);

        // Validate the TheLoaiTaiLieu in Elasticsearch
        verify(mockTheLoaiTaiLieuSearchRepository, times(1)).save(testTheLoaiTaiLieu);
    }

    @Test
    @Transactional
    public void updateNonExistingTheLoaiTaiLieu() throws Exception {
        int databaseSizeBeforeUpdate = theLoaiTaiLieuRepository.findAll().size();

        // Create the TheLoaiTaiLieu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheLoaiTaiLieuMockMvc.perform(put("/api/the-loai-tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiTaiLieu)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiTaiLieu in the database
        List<TheLoaiTaiLieu> theLoaiTaiLieuList = theLoaiTaiLieuRepository.findAll();
        assertThat(theLoaiTaiLieuList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TheLoaiTaiLieu in Elasticsearch
        verify(mockTheLoaiTaiLieuSearchRepository, times(0)).save(theLoaiTaiLieu);
    }

    @Test
    @Transactional
    public void deleteTheLoaiTaiLieu() throws Exception {
        // Initialize the database
        theLoaiTaiLieuService.save(theLoaiTaiLieu);

        int databaseSizeBeforeDelete = theLoaiTaiLieuRepository.findAll().size();

        // Get the theLoaiTaiLieu
        restTheLoaiTaiLieuMockMvc.perform(delete("/api/the-loai-tai-lieus/{id}", theLoaiTaiLieu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheLoaiTaiLieu> theLoaiTaiLieuList = theLoaiTaiLieuRepository.findAll();
        assertThat(theLoaiTaiLieuList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TheLoaiTaiLieu in Elasticsearch
        verify(mockTheLoaiTaiLieuSearchRepository, times(1)).deleteById(theLoaiTaiLieu.getId());
    }

    @Test
    @Transactional
    public void searchTheLoaiTaiLieu() throws Exception {
        // Initialize the database
        theLoaiTaiLieuService.save(theLoaiTaiLieu);
        when(mockTheLoaiTaiLieuSearchRepository.search(queryStringQuery("id:" + theLoaiTaiLieu.getId())))
            .thenReturn(Collections.singletonList(theLoaiTaiLieu));
        // Search the theLoaiTaiLieu
        restTheLoaiTaiLieuMockMvc.perform(get("/api/_search/the-loai-tai-lieus?query=id:" + theLoaiTaiLieu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiTaiLieu.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheLoaiTaiLieu.class);
        TheLoaiTaiLieu theLoaiTaiLieu1 = new TheLoaiTaiLieu();
        theLoaiTaiLieu1.setId(1L);
        TheLoaiTaiLieu theLoaiTaiLieu2 = new TheLoaiTaiLieu();
        theLoaiTaiLieu2.setId(theLoaiTaiLieu1.getId());
        assertThat(theLoaiTaiLieu1).isEqualTo(theLoaiTaiLieu2);
        theLoaiTaiLieu2.setId(2L);
        assertThat(theLoaiTaiLieu1).isNotEqualTo(theLoaiTaiLieu2);
        theLoaiTaiLieu1.setId(null);
        assertThat(theLoaiTaiLieu1).isNotEqualTo(theLoaiTaiLieu2);
    }
}
