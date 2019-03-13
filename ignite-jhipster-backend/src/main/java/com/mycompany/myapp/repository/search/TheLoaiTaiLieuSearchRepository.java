package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TheLoaiTaiLieu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TheLoaiTaiLieu entity.
 */
public interface TheLoaiTaiLieuSearchRepository extends ElasticsearchRepository<TheLoaiTaiLieu, Long> {
}
