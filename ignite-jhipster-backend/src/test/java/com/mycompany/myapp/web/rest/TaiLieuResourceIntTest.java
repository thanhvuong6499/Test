package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.TaiLieu;
import com.mycompany.myapp.repository.TaiLieuRepository;
import com.mycompany.myapp.repository.search.TaiLieuSearchRepository;
import com.mycompany.myapp.service.TaiLieuService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.TrangThai;
/**
 * Test class for the TaiLieuResource REST controller.
 *
 * @see TaiLieuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TaiLieuResourceIntTest {

    private static final String DEFAULT_TEN_VAN_BAN = "AAAAAAAAAA";
    private static final String UPDATED_TEN_VAN_BAN = "BBBBBBBBBB";

    private static final String DEFAULT_TOM_TAT = "AAAAAAAAAA";
    private static final String UPDATED_TOM_TAT = "BBBBBBBBBB";

    private static final String DEFAULT_U_RL = "AAAAAAAAAA";
    private static final String UPDATED_U_RL = "BBBBBBBBBB";

    private static final Integer DEFAULT_DUNG_LUONG = 1;
    private static final Integer UPDATED_DUNG_LUONG = 2;

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final TrangThai DEFAULT_STATUS = TrangThai.TONTAI;
    private static final TrangThai UPDATED_STATUS = TrangThai.DAXOA;

    @Autowired
    private TaiLieuRepository taiLieuRepository;
    @Mock
    private TaiLieuRepository taiLieuRepositoryMock;
    
    @Mock
    private TaiLieuService taiLieuServiceMock;

    @Autowired
    private TaiLieuService taiLieuService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TaiLieuSearchRepositoryMockConfiguration
     */
    @Autowired
    private TaiLieuSearchRepository mockTaiLieuSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTaiLieuMockMvc;

    private TaiLieu taiLieu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaiLieuResource taiLieuResource = new TaiLieuResource(taiLieuService);
        this.restTaiLieuMockMvc = MockMvcBuilders.standaloneSetup(taiLieuResource)
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
    public static TaiLieu createEntity(EntityManager em) {
        TaiLieu taiLieu = new TaiLieu()
            .tenVanBan(DEFAULT_TEN_VAN_BAN)
            .tomTat(DEFAULT_TOM_TAT)
            .uRL(DEFAULT_U_RL)
            .dungLuong(DEFAULT_DUNG_LUONG)
            .tag(DEFAULT_TAG)
            .status(DEFAULT_STATUS);
        return taiLieu;
    }

    @Before
    public void initTest() {
        taiLieu = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaiLieu() throws Exception {
        int databaseSizeBeforeCreate = taiLieuRepository.findAll().size();

        // Create the TaiLieu
        restTaiLieuMockMvc.perform(post("/api/tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taiLieu)))
            .andExpect(status().isCreated());

        // Validate the TaiLieu in the database
        List<TaiLieu> taiLieuList = taiLieuRepository.findAll();
        assertThat(taiLieuList).hasSize(databaseSizeBeforeCreate + 1);
        TaiLieu testTaiLieu = taiLieuList.get(taiLieuList.size() - 1);
        assertThat(testTaiLieu.getTenVanBan()).isEqualTo(DEFAULT_TEN_VAN_BAN);
        assertThat(testTaiLieu.getTomTat()).isEqualTo(DEFAULT_TOM_TAT);
        assertThat(testTaiLieu.getuRL()).isEqualTo(DEFAULT_U_RL);
        assertThat(testTaiLieu.getDungLuong()).isEqualTo(DEFAULT_DUNG_LUONG);
        assertThat(testTaiLieu.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testTaiLieu.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the TaiLieu in Elasticsearch
        verify(mockTaiLieuSearchRepository, times(1)).save(testTaiLieu);
    }

    @Test
    @Transactional
    public void createTaiLieuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taiLieuRepository.findAll().size();

        // Create the TaiLieu with an existing ID
        taiLieu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaiLieuMockMvc.perform(post("/api/tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taiLieu)))
            .andExpect(status().isBadRequest());

        // Validate the TaiLieu in the database
        List<TaiLieu> taiLieuList = taiLieuRepository.findAll();
        assertThat(taiLieuList).hasSize(databaseSizeBeforeCreate);

        // Validate the TaiLieu in Elasticsearch
        verify(mockTaiLieuSearchRepository, times(0)).save(taiLieu);
    }

    @Test
    @Transactional
    public void getAllTaiLieus() throws Exception {
        // Initialize the database
        taiLieuRepository.saveAndFlush(taiLieu);

        // Get all the taiLieuList
        restTaiLieuMockMvc.perform(get("/api/tai-lieus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taiLieu.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenVanBan").value(hasItem(DEFAULT_TEN_VAN_BAN.toString())))
            .andExpect(jsonPath("$.[*].tomTat").value(hasItem(DEFAULT_TOM_TAT.toString())))
            .andExpect(jsonPath("$.[*].uRL").value(hasItem(DEFAULT_U_RL.toString())))
            .andExpect(jsonPath("$.[*].dungLuong").value(hasItem(DEFAULT_DUNG_LUONG)))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    public void getAllTaiLieusWithEagerRelationshipsIsEnabled() throws Exception {
        TaiLieuResource taiLieuResource = new TaiLieuResource(taiLieuServiceMock);
        when(taiLieuServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTaiLieuMockMvc = MockMvcBuilders.standaloneSetup(taiLieuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTaiLieuMockMvc.perform(get("/api/tai-lieus?eagerload=true"))
        .andExpect(status().isOk());

        verify(taiLieuServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTaiLieusWithEagerRelationshipsIsNotEnabled() throws Exception {
        TaiLieuResource taiLieuResource = new TaiLieuResource(taiLieuServiceMock);
            when(taiLieuServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTaiLieuMockMvc = MockMvcBuilders.standaloneSetup(taiLieuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTaiLieuMockMvc.perform(get("/api/tai-lieus?eagerload=true"))
        .andExpect(status().isOk());

            verify(taiLieuServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTaiLieu() throws Exception {
        // Initialize the database
        taiLieuRepository.saveAndFlush(taiLieu);

        // Get the taiLieu
        restTaiLieuMockMvc.perform(get("/api/tai-lieus/{id}", taiLieu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taiLieu.getId().intValue()))
            .andExpect(jsonPath("$.tenVanBan").value(DEFAULT_TEN_VAN_BAN.toString()))
            .andExpect(jsonPath("$.tomTat").value(DEFAULT_TOM_TAT.toString()))
            .andExpect(jsonPath("$.uRL").value(DEFAULT_U_RL.toString()))
            .andExpect(jsonPath("$.dungLuong").value(DEFAULT_DUNG_LUONG))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTaiLieu() throws Exception {
        // Get the taiLieu
        restTaiLieuMockMvc.perform(get("/api/tai-lieus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaiLieu() throws Exception {
        // Initialize the database
        taiLieuService.save(taiLieu);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTaiLieuSearchRepository);

        int databaseSizeBeforeUpdate = taiLieuRepository.findAll().size();

        // Update the taiLieu
        TaiLieu updatedTaiLieu = taiLieuRepository.findById(taiLieu.getId()).get();
        // Disconnect from session so that the updates on updatedTaiLieu are not directly saved in db
        em.detach(updatedTaiLieu);
        updatedTaiLieu
            .tenVanBan(UPDATED_TEN_VAN_BAN)
            .tomTat(UPDATED_TOM_TAT)
            .uRL(UPDATED_U_RL)
            .dungLuong(UPDATED_DUNG_LUONG)
            .tag(UPDATED_TAG)
            .status(UPDATED_STATUS);

        restTaiLieuMockMvc.perform(put("/api/tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaiLieu)))
            .andExpect(status().isOk());

        // Validate the TaiLieu in the database
        List<TaiLieu> taiLieuList = taiLieuRepository.findAll();
        assertThat(taiLieuList).hasSize(databaseSizeBeforeUpdate);
        TaiLieu testTaiLieu = taiLieuList.get(taiLieuList.size() - 1);
        assertThat(testTaiLieu.getTenVanBan()).isEqualTo(UPDATED_TEN_VAN_BAN);
        assertThat(testTaiLieu.getTomTat()).isEqualTo(UPDATED_TOM_TAT);
        assertThat(testTaiLieu.getuRL()).isEqualTo(UPDATED_U_RL);
        assertThat(testTaiLieu.getDungLuong()).isEqualTo(UPDATED_DUNG_LUONG);
        assertThat(testTaiLieu.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testTaiLieu.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the TaiLieu in Elasticsearch
        verify(mockTaiLieuSearchRepository, times(1)).save(testTaiLieu);
    }

    @Test
    @Transactional
    public void updateNonExistingTaiLieu() throws Exception {
        int databaseSizeBeforeUpdate = taiLieuRepository.findAll().size();

        // Create the TaiLieu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTaiLieuMockMvc.perform(put("/api/tai-lieus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taiLieu)))
            .andExpect(status().isBadRequest());

        // Validate the TaiLieu in the database
        List<TaiLieu> taiLieuList = taiLieuRepository.findAll();
        assertThat(taiLieuList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TaiLieu in Elasticsearch
        verify(mockTaiLieuSearchRepository, times(0)).save(taiLieu);
    }

    @Test
    @Transactional
    public void deleteTaiLieu() throws Exception {
        // Initialize the database
        taiLieuService.save(taiLieu);

        int databaseSizeBeforeDelete = taiLieuRepository.findAll().size();

        // Get the taiLieu
        restTaiLieuMockMvc.perform(delete("/api/tai-lieus/{id}", taiLieu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TaiLieu> taiLieuList = taiLieuRepository.findAll();
        assertThat(taiLieuList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TaiLieu in Elasticsearch
        verify(mockTaiLieuSearchRepository, times(1)).deleteById(taiLieu.getId());
    }

    @Test
    @Transactional
    public void searchTaiLieu() throws Exception {
        // Initialize the database
        taiLieuService.save(taiLieu);
        when(mockTaiLieuSearchRepository.search(queryStringQuery("id:" + taiLieu.getId())))
            .thenReturn(Collections.singletonList(taiLieu));
        // Search the taiLieu
        restTaiLieuMockMvc.perform(get("/api/_search/tai-lieus?query=id:" + taiLieu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taiLieu.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenVanBan").value(hasItem(DEFAULT_TEN_VAN_BAN.toString())))
            .andExpect(jsonPath("$.[*].tomTat").value(hasItem(DEFAULT_TOM_TAT.toString())))
            .andExpect(jsonPath("$.[*].uRL").value(hasItem(DEFAULT_U_RL.toString())))
            .andExpect(jsonPath("$.[*].dungLuong").value(hasItem(DEFAULT_DUNG_LUONG)))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaiLieu.class);
        TaiLieu taiLieu1 = new TaiLieu();
        taiLieu1.setId(1L);
        TaiLieu taiLieu2 = new TaiLieu();
        taiLieu2.setId(taiLieu1.getId());
        assertThat(taiLieu1).isEqualTo(taiLieu2);
        taiLieu2.setId(2L);
        assertThat(taiLieu1).isNotEqualTo(taiLieu2);
        taiLieu1.setId(null);
        assertThat(taiLieu1).isNotEqualTo(taiLieu2);
    }
}
