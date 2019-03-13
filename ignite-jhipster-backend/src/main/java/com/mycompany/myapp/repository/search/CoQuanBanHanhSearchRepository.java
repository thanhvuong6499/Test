package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.CoQuanBanHanh;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CoQuanBanHanh entity.
 */
public interface CoQuanBanHanhSearchRepository extends ElasticsearchRepository<CoQuanBanHanh, Long> {
}
