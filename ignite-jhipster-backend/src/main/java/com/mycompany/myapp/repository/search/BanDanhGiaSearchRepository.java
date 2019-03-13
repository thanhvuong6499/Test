package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.BanDanhGia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the BanDanhGia entity.
 */
public interface BanDanhGiaSearchRepository extends ElasticsearchRepository<BanDanhGia, Long> {
}
