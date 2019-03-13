package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.GiaoVien;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GiaoVien entity.
 */
public interface GiaoVienSearchRepository extends ElasticsearchRepository<GiaoVien, Long> {
}
