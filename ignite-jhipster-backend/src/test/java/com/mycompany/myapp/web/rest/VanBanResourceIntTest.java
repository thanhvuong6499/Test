package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.VanBan;
import com.mycompany.myapp.repository.VanBanRepository;
import com.mycompany.myapp.repository.search.VanBanSearchRepository;
import com.mycompany.myapp.service.VanBanService;
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

import com.mycompany.myapp.domain.enumeration.TrangThai;
/**
 * Test class for the VanBanResource REST controller.
 *
 * @see VanBanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class VanBanResourceIntTest {

    private static final String DEFAULT_TEN_VANBAN = "AAAAAAAAAA";
    private static final String UPDATED_TEN_VANBAN = "BBBBBBBBBB";

    private static final String DEFAULT_TOM_TAT = "AAAAAAAAAA";
    private static final String UPDATED_TOM_TAT = "BBBBBBBBBB";

    private static final String DEFAULT_U_RL = "AAAAAAAAAA";
    private static final String UPDATED_U_RL = "BBBBBBBBBB";

    private static final TrangThai DEFAULT_STATUS = TrangThai.TONTAI;
    private static final TrangThai UPDATED_STATUS = TrangThai.DAXOA;

    @Autowired
    private VanBanRepository vanBanRepository;

    

    @Autowired
    private VanBanService vanBanService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.VanBanSearchRepositoryMockConfiguration
     */
    @Autowired
    private VanBanSearchRepository mockVanBanSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVanBanMockMvc;

    private VanBan vanBan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VanBanResource vanBanResource = new VanBanResource(vanBanService);
        this.restVanBanMockMvc = MockMvcBuilders.standaloneSetup(vanBanResource)
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
    public static VanBan createEntity(EntityManager em) {
        VanBan vanBan = new VanBan()
            .tenVanban(DEFAULT_TEN_VANBAN)
            .tomTat(DEFAULT_TOM_TAT)
            .uRL(DEFAULT_U_RL)
            .status(DEFAULT_STATUS);
        return vanBan;
    }

    @Before
    public void initTest() {
        vanBan = createEntity(em);
    }

    @Test
    @Transactional
    public void createVanBan() throws Exception {
        int databaseSizeBeforeCreate = vanBanRepository.findAll().size();

        // Create the VanBan
        restVanBanMockMvc.perform(post("/api/van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vanBan)))
            .andExpect(status().isCreated());

        // Validate the VanBan in the database
        List<VanBan> vanBanList = vanBanRepository.findAll();
        assertThat(vanBanList).hasSize(databaseSizeBeforeCreate + 1);
        VanBan testVanBan = vanBanList.get(vanBanList.size() - 1);
        assertThat(testVanBan.getTenVanban()).isEqualTo(DEFAULT_TEN_VANBAN);
        assertThat(testVanBan.getTomTat()).isEqualTo(DEFAULT_TOM_TAT);
        assertThat(testVanBan.getuRL()).isEqualTo(DEFAULT_U_RL);
        assertThat(testVanBan.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the VanBan in Elasticsearch
        verify(mockVanBanSearchRepository, times(1)).save(testVanBan);
    }

    @Test
    @Transactional
    public void createVanBanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vanBanRepository.findAll().size();

        // Create the VanBan with an existing ID
        vanBan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVanBanMockMvc.perform(post("/api/van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vanBan)))
            .andExpect(status().isBadRequest());

        // Validate the VanBan in the database
        List<VanBan> vanBanList = vanBanRepository.findAll();
        assertThat(vanBanList).hasSize(databaseSizeBeforeCreate);

        // Validate the VanBan in Elasticsearch
        verify(mockVanBanSearchRepository, times(0)).save(vanBan);
    }

    @Test
    @Transactional
    public void getAllVanBans() throws Exception {
        // Initialize the database
        vanBanRepository.saveAndFlush(vanBan);

        // Get all the vanBanList
        restVanBanMockMvc.perform(get("/api/van-bans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vanBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenVanban").value(hasItem(DEFAULT_TEN_VANBAN.toString())))
            .andExpect(jsonPath("$.[*].tomTat").value(hasItem(DEFAULT_TOM_TAT.toString())))
            .andExpect(jsonPath("$.[*].uRL").value(hasItem(DEFAULT_U_RL.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getVanBan() throws Exception {
        // Initialize the database
        vanBanRepository.saveAndFlush(vanBan);

        // Get the vanBan
        restVanBanMockMvc.perform(get("/api/van-bans/{id}", vanBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vanBan.getId().intValue()))
            .andExpect(jsonPath("$.tenVanban").value(DEFAULT_TEN_VANBAN.toString()))
            .andExpect(jsonPath("$.tomTat").value(DEFAULT_TOM_TAT.toString()))
            .andExpect(jsonPath("$.uRL").value(DEFAULT_U_RL.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingVanBan() throws Exception {
        // Get the vanBan
        restVanBanMockMvc.perform(get("/api/van-bans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVanBan() throws Exception {
        // Initialize the database
        vanBanService.save(vanBan);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockVanBanSearchRepository);

        int databaseSizeBeforeUpdate = vanBanRepository.findAll().size();

        // Update the vanBan
        VanBan updatedVanBan = vanBanRepository.findById(vanBan.getId()).get();
        // Disconnect from session so that the updates on updatedVanBan are not directly saved in db
        em.detach(updatedVanBan);
        updatedVanBan
            .tenVanban(UPDATED_TEN_VANBAN)
            .tomTat(UPDATED_TOM_TAT)
            .uRL(UPDATED_U_RL)
            .status(UPDATED_STATUS);

        restVanBanMockMvc.perform(put("/api/van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVanBan)))
            .andExpect(status().isOk());

        // Validate the VanBan in the database
        List<VanBan> vanBanList = vanBanRepository.findAll();
        assertThat(vanBanList).hasSize(databaseSizeBeforeUpdate);
        VanBan testVanBan = vanBanList.get(vanBanList.size() - 1);
        assertThat(testVanBan.getTenVanban()).isEqualTo(UPDATED_TEN_VANBAN);
        assertThat(testVanBan.getTomTat()).isEqualTo(UPDATED_TOM_TAT);
        assertThat(testVanBan.getuRL()).isEqualTo(UPDATED_U_RL);
        assertThat(testVanBan.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the VanBan in Elasticsearch
        verify(mockVanBanSearchRepository, times(1)).save(testVanBan);
    }

    @Test
    @Transactional
    public void updateNonExistingVanBan() throws Exception {
        int databaseSizeBeforeUpdate = vanBanRepository.findAll().size();

        // Create the VanBan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVanBanMockMvc.perform(put("/api/van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vanBan)))
            .andExpect(status().isBadRequest());

        // Validate the VanBan in the database
        List<VanBan> vanBanList = vanBanRepository.findAll();
        assertThat(vanBanList).hasSize(databaseSizeBeforeUpdate);

        // Validate the VanBan in Elasticsearch
        verify(mockVanBanSearchRepository, times(0)).save(vanBan);
    }

    @Test
    @Transactional
    public void deleteVanBan() throws Exception {
        // Initialize the database
        vanBanService.save(vanBan);

        int databaseSizeBeforeDelete = vanBanRepository.findAll().size();

        // Get the vanBan
        restVanBanMockMvc.perform(delete("/api/van-bans/{id}", vanBan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VanBan> vanBanList = vanBanRepository.findAll();
        assertThat(vanBanList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the VanBan in Elasticsearch
        verify(mockVanBanSearchRepository, times(1)).deleteById(vanBan.getId());
    }

    @Test
    @Transactional
    public void searchVanBan() throws Exception {
        // Initialize the database
        vanBanService.save(vanBan);
        when(mockVanBanSearchRepository.search(queryStringQuery("id:" + vanBan.getId())))
            .thenReturn(Collections.singletonList(vanBan));
        // Search the vanBan
        restVanBanMockMvc.perform(get("/api/_search/van-bans?query=id:" + vanBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vanBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenVanban").value(hasItem(DEFAULT_TEN_VANBAN.toString())))
            .andExpect(jsonPath("$.[*].tomTat").value(hasItem(DEFAULT_TOM_TAT.toString())))
            .andExpect(jsonPath("$.[*].uRL").value(hasItem(DEFAULT_U_RL.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VanBan.class);
        VanBan vanBan1 = new VanBan();
        vanBan1.setId(1L);
        VanBan vanBan2 = new VanBan();
        vanBan2.setId(vanBan1.getId());
        assertThat(vanBan1).isEqualTo(vanBan2);
        vanBan2.setId(2L);
        assertThat(vanBan1).isNotEqualTo(vanBan2);
        vanBan1.setId(null);
        assertThat(vanBan1).isNotEqualTo(vanBan2);
    }
}
