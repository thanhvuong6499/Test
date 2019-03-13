package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.GiaoVien;
import com.mycompany.myapp.repository.GiaoVienRepository;
import com.mycompany.myapp.repository.search.GiaoVienSearchRepository;
import com.mycompany.myapp.service.GiaoVienService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.CapBacGV;
import com.mycompany.myapp.domain.enumeration.TrangThai;
/**
 * Test class for the GiaoVienResource REST controller.
 *
 * @see GiaoVienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class GiaoVienResourceIntTest {

    private static final String DEFAULT_C_MND = "AAAAAAAAAA";
    private static final String UPDATED_C_MND = "BBBBBBBBBB";

    private static final String DEFAULT_HO_TEN = "AAAAAAAAAA";
    private static final String UPDATED_HO_TEN = "BBBBBBBBBB";

    private static final String DEFAULT_S_DT = "AAAAAAAAAA";
    private static final String UPDATED_S_DT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NGAY_SINH = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NGAY_SINH = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_QUE_QUAN = "AAAAAAAAAA";
    private static final String UPDATED_QUE_QUAN = "BBBBBBBBBB";

    private static final String DEFAULT_DIA_CHI = "AAAAAAAAAA";
    private static final String UPDATED_DIA_CHI = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MAT_KHAU = "AAAAAAAAAA";
    private static final String UPDATED_MAT_KHAU = "BBBBBBBBBB";

    private static final Integer DEFAULT_DUNG_LUONG_KHO = 1;
    private static final Integer UPDATED_DUNG_LUONG_KHO = 2;

    private static final Integer DEFAULT_DA_SU_DUNG = 1;
    private static final Integer UPDATED_DA_SU_DUNG = 2;

    private static final CapBacGV DEFAULT_CAP_BAC = CapBacGV.GIAOVIEN;
    private static final CapBacGV UPDATED_CAP_BAC = CapBacGV.TRUONGKHOA;

    private static final TrangThai DEFAULT_STATUS = TrangThai.TONTAI;
    private static final TrangThai UPDATED_STATUS = TrangThai.DAXOA;

    @Autowired
    private GiaoVienRepository giaoVienRepository;
    @Mock
    private GiaoVienRepository giaoVienRepositoryMock;
    
    @Mock
    private GiaoVienService giaoVienServiceMock;

    @Autowired
    private GiaoVienService giaoVienService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.GiaoVienSearchRepositoryMockConfiguration
     */
    @Autowired
    private GiaoVienSearchRepository mockGiaoVienSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGiaoVienMockMvc;

    private GiaoVien giaoVien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GiaoVienResource giaoVienResource = new GiaoVienResource(giaoVienService);
        this.restGiaoVienMockMvc = MockMvcBuilders.standaloneSetup(giaoVienResource)
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
    public static GiaoVien createEntity(EntityManager em) {
        GiaoVien giaoVien = new GiaoVien()
            .cMND(DEFAULT_C_MND)
            .hoTen(DEFAULT_HO_TEN)
            .sDT(DEFAULT_S_DT)
            .ngaySinh(DEFAULT_NGAY_SINH)
            .queQuan(DEFAULT_QUE_QUAN)
            .diaChi(DEFAULT_DIA_CHI)
            .email(DEFAULT_EMAIL)
            .matKhau(DEFAULT_MAT_KHAU)
            .dungLuongKho(DEFAULT_DUNG_LUONG_KHO)
            .daSuDung(DEFAULT_DA_SU_DUNG)
            .capBac(DEFAULT_CAP_BAC)
            .status(DEFAULT_STATUS);
        return giaoVien;
    }

    @Before
    public void initTest() {
        giaoVien = createEntity(em);
    }

    @Test
    @Transactional
    public void createGiaoVien() throws Exception {
        int databaseSizeBeforeCreate = giaoVienRepository.findAll().size();

        // Create the GiaoVien
        restGiaoVienMockMvc.perform(post("/api/giao-viens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giaoVien)))
            .andExpect(status().isCreated());

        // Validate the GiaoVien in the database
        List<GiaoVien> giaoVienList = giaoVienRepository.findAll();
        assertThat(giaoVienList).hasSize(databaseSizeBeforeCreate + 1);
        GiaoVien testGiaoVien = giaoVienList.get(giaoVienList.size() - 1);
        assertThat(testGiaoVien.getcMND()).isEqualTo(DEFAULT_C_MND);
        assertThat(testGiaoVien.getHoTen()).isEqualTo(DEFAULT_HO_TEN);
        assertThat(testGiaoVien.getsDT()).isEqualTo(DEFAULT_S_DT);
        assertThat(testGiaoVien.getNgaySinh()).isEqualTo(DEFAULT_NGAY_SINH);
        assertThat(testGiaoVien.getQueQuan()).isEqualTo(DEFAULT_QUE_QUAN);
        assertThat(testGiaoVien.getDiaChi()).isEqualTo(DEFAULT_DIA_CHI);
        assertThat(testGiaoVien.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testGiaoVien.getMatKhau()).isEqualTo(DEFAULT_MAT_KHAU);
        assertThat(testGiaoVien.getDungLuongKho()).isEqualTo(DEFAULT_DUNG_LUONG_KHO);
        assertThat(testGiaoVien.getDaSuDung()).isEqualTo(DEFAULT_DA_SU_DUNG);
        assertThat(testGiaoVien.getCapBac()).isEqualTo(DEFAULT_CAP_BAC);
        assertThat(testGiaoVien.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the GiaoVien in Elasticsearch
        verify(mockGiaoVienSearchRepository, times(1)).save(testGiaoVien);
    }

    @Test
    @Transactional
    public void createGiaoVienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = giaoVienRepository.findAll().size();

        // Create the GiaoVien with an existing ID
        giaoVien.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGiaoVienMockMvc.perform(post("/api/giao-viens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giaoVien)))
            .andExpect(status().isBadRequest());

        // Validate the GiaoVien in the database
        List<GiaoVien> giaoVienList = giaoVienRepository.findAll();
        assertThat(giaoVienList).hasSize(databaseSizeBeforeCreate);

        // Validate the GiaoVien in Elasticsearch
        verify(mockGiaoVienSearchRepository, times(0)).save(giaoVien);
    }

    @Test
    @Transactional
    public void getAllGiaoViens() throws Exception {
        // Initialize the database
        giaoVienRepository.saveAndFlush(giaoVien);

        // Get all the giaoVienList
        restGiaoVienMockMvc.perform(get("/api/giao-viens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(giaoVien.getId().intValue())))
            .andExpect(jsonPath("$.[*].cMND").value(hasItem(DEFAULT_C_MND.toString())))
            .andExpect(jsonPath("$.[*].hoTen").value(hasItem(DEFAULT_HO_TEN.toString())))
            .andExpect(jsonPath("$.[*].sDT").value(hasItem(DEFAULT_S_DT.toString())))
            .andExpect(jsonPath("$.[*].ngaySinh").value(hasItem(sameInstant(DEFAULT_NGAY_SINH))))
            .andExpect(jsonPath("$.[*].queQuan").value(hasItem(DEFAULT_QUE_QUAN.toString())))
            .andExpect(jsonPath("$.[*].diaChi").value(hasItem(DEFAULT_DIA_CHI.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].matKhau").value(hasItem(DEFAULT_MAT_KHAU.toString())))
            .andExpect(jsonPath("$.[*].dungLuongKho").value(hasItem(DEFAULT_DUNG_LUONG_KHO)))
            .andExpect(jsonPath("$.[*].daSuDung").value(hasItem(DEFAULT_DA_SU_DUNG)))
            .andExpect(jsonPath("$.[*].capBac").value(hasItem(DEFAULT_CAP_BAC.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    public void getAllGiaoViensWithEagerRelationshipsIsEnabled() throws Exception {
        GiaoVienResource giaoVienResource = new GiaoVienResource(giaoVienServiceMock);
        when(giaoVienServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restGiaoVienMockMvc = MockMvcBuilders.standaloneSetup(giaoVienResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGiaoVienMockMvc.perform(get("/api/giao-viens?eagerload=true"))
        .andExpect(status().isOk());

        verify(giaoVienServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllGiaoViensWithEagerRelationshipsIsNotEnabled() throws Exception {
        GiaoVienResource giaoVienResource = new GiaoVienResource(giaoVienServiceMock);
            when(giaoVienServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restGiaoVienMockMvc = MockMvcBuilders.standaloneSetup(giaoVienResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGiaoVienMockMvc.perform(get("/api/giao-viens?eagerload=true"))
        .andExpect(status().isOk());

            verify(giaoVienServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getGiaoVien() throws Exception {
        // Initialize the database
        giaoVienRepository.saveAndFlush(giaoVien);

        // Get the giaoVien
        restGiaoVienMockMvc.perform(get("/api/giao-viens/{id}", giaoVien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(giaoVien.getId().intValue()))
            .andExpect(jsonPath("$.cMND").value(DEFAULT_C_MND.toString()))
            .andExpect(jsonPath("$.hoTen").value(DEFAULT_HO_TEN.toString()))
            .andExpect(jsonPath("$.sDT").value(DEFAULT_S_DT.toString()))
            .andExpect(jsonPath("$.ngaySinh").value(sameInstant(DEFAULT_NGAY_SINH)))
            .andExpect(jsonPath("$.queQuan").value(DEFAULT_QUE_QUAN.toString()))
            .andExpect(jsonPath("$.diaChi").value(DEFAULT_DIA_CHI.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.matKhau").value(DEFAULT_MAT_KHAU.toString()))
            .andExpect(jsonPath("$.dungLuongKho").value(DEFAULT_DUNG_LUONG_KHO))
            .andExpect(jsonPath("$.daSuDung").value(DEFAULT_DA_SU_DUNG))
            .andExpect(jsonPath("$.capBac").value(DEFAULT_CAP_BAC.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingGiaoVien() throws Exception {
        // Get the giaoVien
        restGiaoVienMockMvc.perform(get("/api/giao-viens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGiaoVien() throws Exception {
        // Initialize the database
        giaoVienService.save(giaoVien);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockGiaoVienSearchRepository);

        int databaseSizeBeforeUpdate = giaoVienRepository.findAll().size();

        // Update the giaoVien
        GiaoVien updatedGiaoVien = giaoVienRepository.findById(giaoVien.getId()).get();
        // Disconnect from session so that the updates on updatedGiaoVien are not directly saved in db
        em.detach(updatedGiaoVien);
        updatedGiaoVien
            .cMND(UPDATED_C_MND)
            .hoTen(UPDATED_HO_TEN)
            .sDT(UPDATED_S_DT)
            .ngaySinh(UPDATED_NGAY_SINH)
            .queQuan(UPDATED_QUE_QUAN)
            .diaChi(UPDATED_DIA_CHI)
            .email(UPDATED_EMAIL)
            .matKhau(UPDATED_MAT_KHAU)
            .dungLuongKho(UPDATED_DUNG_LUONG_KHO)
            .daSuDung(UPDATED_DA_SU_DUNG)
            .capBac(UPDATED_CAP_BAC)
            .status(UPDATED_STATUS);

        restGiaoVienMockMvc.perform(put("/api/giao-viens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGiaoVien)))
            .andExpect(status().isOk());

        // Validate the GiaoVien in the database
        List<GiaoVien> giaoVienList = giaoVienRepository.findAll();
        assertThat(giaoVienList).hasSize(databaseSizeBeforeUpdate);
        GiaoVien testGiaoVien = giaoVienList.get(giaoVienList.size() - 1);
        assertThat(testGiaoVien.getcMND()).isEqualTo(UPDATED_C_MND);
        assertThat(testGiaoVien.getHoTen()).isEqualTo(UPDATED_HO_TEN);
        assertThat(testGiaoVien.getsDT()).isEqualTo(UPDATED_S_DT);
        assertThat(testGiaoVien.getNgaySinh()).isEqualTo(UPDATED_NGAY_SINH);
        assertThat(testGiaoVien.getQueQuan()).isEqualTo(UPDATED_QUE_QUAN);
        assertThat(testGiaoVien.getDiaChi()).isEqualTo(UPDATED_DIA_CHI);
        assertThat(testGiaoVien.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testGiaoVien.getMatKhau()).isEqualTo(UPDATED_MAT_KHAU);
        assertThat(testGiaoVien.getDungLuongKho()).isEqualTo(UPDATED_DUNG_LUONG_KHO);
        assertThat(testGiaoVien.getDaSuDung()).isEqualTo(UPDATED_DA_SU_DUNG);
        assertThat(testGiaoVien.getCapBac()).isEqualTo(UPDATED_CAP_BAC);
        assertThat(testGiaoVien.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the GiaoVien in Elasticsearch
        verify(mockGiaoVienSearchRepository, times(1)).save(testGiaoVien);
    }

    @Test
    @Transactional
    public void updateNonExistingGiaoVien() throws Exception {
        int databaseSizeBeforeUpdate = giaoVienRepository.findAll().size();

        // Create the GiaoVien

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGiaoVienMockMvc.perform(put("/api/giao-viens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giaoVien)))
            .andExpect(status().isBadRequest());

        // Validate the GiaoVien in the database
        List<GiaoVien> giaoVienList = giaoVienRepository.findAll();
        assertThat(giaoVienList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GiaoVien in Elasticsearch
        verify(mockGiaoVienSearchRepository, times(0)).save(giaoVien);
    }

    @Test
    @Transactional
    public void deleteGiaoVien() throws Exception {
        // Initialize the database
        giaoVienService.save(giaoVien);

        int databaseSizeBeforeDelete = giaoVienRepository.findAll().size();

        // Get the giaoVien
        restGiaoVienMockMvc.perform(delete("/api/giao-viens/{id}", giaoVien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GiaoVien> giaoVienList = giaoVienRepository.findAll();
        assertThat(giaoVienList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GiaoVien in Elasticsearch
        verify(mockGiaoVienSearchRepository, times(1)).deleteById(giaoVien.getId());
    }

    @Test
    @Transactional
    public void searchGiaoVien() throws Exception {
        // Initialize the database
        giaoVienService.save(giaoVien);
        when(mockGiaoVienSearchRepository.search(queryStringQuery("id:" + giaoVien.getId())))
            .thenReturn(Collections.singletonList(giaoVien));
        // Search the giaoVien
        restGiaoVienMockMvc.perform(get("/api/_search/giao-viens?query=id:" + giaoVien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(giaoVien.getId().intValue())))
            .andExpect(jsonPath("$.[*].cMND").value(hasItem(DEFAULT_C_MND.toString())))
            .andExpect(jsonPath("$.[*].hoTen").value(hasItem(DEFAULT_HO_TEN.toString())))
            .andExpect(jsonPath("$.[*].sDT").value(hasItem(DEFAULT_S_DT.toString())))
            .andExpect(jsonPath("$.[*].ngaySinh").value(hasItem(sameInstant(DEFAULT_NGAY_SINH))))
            .andExpect(jsonPath("$.[*].queQuan").value(hasItem(DEFAULT_QUE_QUAN.toString())))
            .andExpect(jsonPath("$.[*].diaChi").value(hasItem(DEFAULT_DIA_CHI.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].matKhau").value(hasItem(DEFAULT_MAT_KHAU.toString())))
            .andExpect(jsonPath("$.[*].dungLuongKho").value(hasItem(DEFAULT_DUNG_LUONG_KHO)))
            .andExpect(jsonPath("$.[*].daSuDung").value(hasItem(DEFAULT_DA_SU_DUNG)))
            .andExpect(jsonPath("$.[*].capBac").value(hasItem(DEFAULT_CAP_BAC.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GiaoVien.class);
        GiaoVien giaoVien1 = new GiaoVien();
        giaoVien1.setId(1L);
        GiaoVien giaoVien2 = new GiaoVien();
        giaoVien2.setId(giaoVien1.getId());
        assertThat(giaoVien1).isEqualTo(giaoVien2);
        giaoVien2.setId(2L);
        assertThat(giaoVien1).isNotEqualTo(giaoVien2);
        giaoVien1.setId(null);
        assertThat(giaoVien1).isNotEqualTo(giaoVien2);
    }
}
