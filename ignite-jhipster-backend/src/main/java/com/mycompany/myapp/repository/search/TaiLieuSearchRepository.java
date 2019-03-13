package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TaiLieu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TaiLieu entity.
 */
public interface TaiLieuSearchRepository extends ElasticsearchRepository<TaiLieu, Long> {
}
