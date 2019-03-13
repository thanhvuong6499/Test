package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TieuChiDanhGia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TieuChiDanhGia entity.
 */
public interface TieuChiDanhGiaSearchRepository extends ElasticsearchRepository<TieuChiDanhGia, Long> {
}
