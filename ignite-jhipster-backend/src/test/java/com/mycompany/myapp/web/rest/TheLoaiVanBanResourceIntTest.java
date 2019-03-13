package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.TheLoaiVanBan;
import com.mycompany.myapp.repository.TheLoaiVanBanRepository;
import com.mycompany.myapp.repository.search.TheLoaiVanBanSearchRepository;
import com.mycompany.myapp.service.TheLoaiVanBanService;
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
 * Test class for the TheLoaiVanBanResource REST controller.
 *
 * @see TheLoaiVanBanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TheLoaiVanBanResourceIntTest {

    private static final String DEFAULT_NOI_DUNG = "AAAAAAAAAA";
    private static final String UPDATED_NOI_DUNG = "BBBBBBBBBB";

    @Autowired
    private TheLoaiVanBanRepository theLoaiVanBanRepository;

    

    @Autowired
    private TheLoaiVanBanService theLoaiVanBanService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TheLoaiVanBanSearchRepositoryMockConfiguration
     */
    @Autowired
    private TheLoaiVanBanSearchRepository mockTheLoaiVanBanSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheLoaiVanBanMockMvc;

    private TheLoaiVanBan theLoaiVanBan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheLoaiVanBanResource theLoaiVanBanResource = new TheLoaiVanBanResource(theLoaiVanBanService);
        this.restTheLoaiVanBanMockMvc = MockMvcBuilders.standaloneSetup(theLoaiVanBanResource)
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
    public static TheLoaiVanBan createEntity(EntityManager em) {
        TheLoaiVanBan theLoaiVanBan = new TheLoaiVanBan()
            .noiDung(DEFAULT_NOI_DUNG);
        return theLoaiVanBan;
    }

    @Before
    public void initTest() {
        theLoaiVanBan = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheLoaiVanBan() throws Exception {
        int databaseSizeBeforeCreate = theLoaiVanBanRepository.findAll().size();

        // Create the TheLoaiVanBan
        restTheLoaiVanBanMockMvc.perform(post("/api/the-loai-van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiVanBan)))
            .andExpect(status().isCreated());

        // Validate the TheLoaiVanBan in the database
        List<TheLoaiVanBan> theLoaiVanBanList = theLoaiVanBanRepository.findAll();
        assertThat(theLoaiVanBanList).hasSize(databaseSizeBeforeCreate + 1);
        TheLoaiVanBan testTheLoaiVanBan = theLoaiVanBanList.get(theLoaiVanBanList.size() - 1);
        assertThat(testTheLoaiVanBan.getNoiDung()).isEqualTo(DEFAULT_NOI_DUNG);

        // Validate the TheLoaiVanBan in Elasticsearch
        verify(mockTheLoaiVanBanSearchRepository, times(1)).save(testTheLoaiVanBan);
    }

    @Test
    @Transactional
    public void createTheLoaiVanBanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theLoaiVanBanRepository.findAll().size();

        // Create the TheLoaiVanBan with an existing ID
        theLoaiVanBan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheLoaiVanBanMockMvc.perform(post("/api/the-loai-van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiVanBan)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiVanBan in the database
        List<TheLoaiVanBan> theLoaiVanBanList = theLoaiVanBanRepository.findAll();
        assertThat(theLoaiVanBanList).hasSize(databaseSizeBeforeCreate);

        // Validate the TheLoaiVanBan in Elasticsearch
        verify(mockTheLoaiVanBanSearchRepository, times(0)).save(theLoaiVanBan);
    }

    @Test
    @Transactional
    public void getAllTheLoaiVanBans() throws Exception {
        // Initialize the database
        theLoaiVanBanRepository.saveAndFlush(theLoaiVanBan);

        // Get all the theLoaiVanBanList
        restTheLoaiVanBanMockMvc.perform(get("/api/the-loai-van-bans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiVanBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())));
    }
    

    @Test
    @Transactional
    public void getTheLoaiVanBan() throws Exception {
        // Initialize the database
        theLoaiVanBanRepository.saveAndFlush(theLoaiVanBan);

        // Get the theLoaiVanBan
        restTheLoaiVanBanMockMvc.perform(get("/api/the-loai-van-bans/{id}", theLoaiVanBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theLoaiVanBan.getId().intValue()))
            .andExpect(jsonPath("$.noiDung").value(DEFAULT_NOI_DUNG.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTheLoaiVanBan() throws Exception {
        // Get the theLoaiVanBan
        restTheLoaiVanBanMockMvc.perform(get("/api/the-loai-van-bans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheLoaiVanBan() throws Exception {
        // Initialize the database
        theLoaiVanBanService.save(theLoaiVanBan);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTheLoaiVanBanSearchRepository);

        int databaseSizeBeforeUpdate = theLoaiVanBanRepository.findAll().size();

        // Update the theLoaiVanBan
        TheLoaiVanBan updatedTheLoaiVanBan = theLoaiVanBanRepository.findById(theLoaiVanBan.getId()).get();
        // Disconnect from session so that the updates on updatedTheLoaiVanBan are not directly saved in db
        em.detach(updatedTheLoaiVanBan);
        updatedTheLoaiVanBan
            .noiDung(UPDATED_NOI_DUNG);

        restTheLoaiVanBanMockMvc.perform(put("/api/the-loai-van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheLoaiVanBan)))
            .andExpect(status().isOk());

        // Validate the TheLoaiVanBan in the database
        List<TheLoaiVanBan> theLoaiVanBanList = theLoaiVanBanRepository.findAll();
        assertThat(theLoaiVanBanList).hasSize(databaseSizeBeforeUpdate);
        TheLoaiVanBan testTheLoaiVanBan = theLoaiVanBanList.get(theLoaiVanBanList.size() - 1);
        assertThat(testTheLoaiVanBan.getNoiDung()).isEqualTo(UPDATED_NOI_DUNG);

        // Validate the TheLoaiVanBan in Elasticsearch
        verify(mockTheLoaiVanBanSearchRepository, times(1)).save(testTheLoaiVanBan);
    }

    @Test
    @Transactional
    public void updateNonExistingTheLoaiVanBan() throws Exception {
        int databaseSizeBeforeUpdate = theLoaiVanBanRepository.findAll().size();

        // Create the TheLoaiVanBan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheLoaiVanBanMockMvc.perform(put("/api/the-loai-van-bans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theLoaiVanBan)))
            .andExpect(status().isBadRequest());

        // Validate the TheLoaiVanBan in the database
        List<TheLoaiVanBan> theLoaiVanBanList = theLoaiVanBanRepository.findAll();
        assertThat(theLoaiVanBanList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TheLoaiVanBan in Elasticsearch
        verify(mockTheLoaiVanBanSearchRepository, times(0)).save(theLoaiVanBan);
    }

    @Test
    @Transactional
    public void deleteTheLoaiVanBan() throws Exception {
        // Initialize the database
        theLoaiVanBanService.save(theLoaiVanBan);

        int databaseSizeBeforeDelete = theLoaiVanBanRepository.findAll().size();

        // Get the theLoaiVanBan
        restTheLoaiVanBanMockMvc.perform(delete("/api/the-loai-van-bans/{id}", theLoaiVanBan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheLoaiVanBan> theLoaiVanBanList = theLoaiVanBanRepository.findAll();
        assertThat(theLoaiVanBanList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TheLoaiVanBan in Elasticsearch
        verify(mockTheLoaiVanBanSearchRepository, times(1)).deleteById(theLoaiVanBan.getId());
    }

    @Test
    @Transactional
    public void searchTheLoaiVanBan() throws Exception {
        // Initialize the database
        theLoaiVanBanService.save(theLoaiVanBan);
        when(mockTheLoaiVanBanSearchRepository.search(queryStringQuery("id:" + theLoaiVanBan.getId())))
            .thenReturn(Collections.singletonList(theLoaiVanBan));
        // Search the theLoaiVanBan
        restTheLoaiVanBanMockMvc.perform(get("/api/_search/the-loai-van-bans?query=id:" + theLoaiVanBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theLoaiVanBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].noiDung").value(hasItem(DEFAULT_NOI_DUNG.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheLoaiVanBan.class);
        TheLoaiVanBan theLoaiVanBan1 = new TheLoaiVanBan();
        theLoaiVanBan1.setId(1L);
        TheLoaiVanBan theLoaiVanBan2 = new TheLoaiVanBan();
        theLoaiVanBan2.setId(theLoaiVanBan1.getId());
        assertThat(theLoaiVanBan1).isEqualTo(theLoaiVanBan2);
        theLoaiVanBan2.setId(2L);
        assertThat(theLoaiVanBan1).isNotEqualTo(theLoaiVanBan2);
        theLoaiVanBan1.setId(null);
        assertThat(theLoaiVanBan1).isNotEqualTo(theLoaiVanBan2);
    }
}
