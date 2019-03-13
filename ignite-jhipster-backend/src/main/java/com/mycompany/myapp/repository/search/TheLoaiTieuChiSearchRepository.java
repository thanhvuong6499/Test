package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TheLoaiTieuChi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TheLoaiTieuChi entity.
 */
public interface TheLoaiTieuChiSearchRepository extends ElasticsearchRepository<TheLoaiTieuChi, Long> {
}
