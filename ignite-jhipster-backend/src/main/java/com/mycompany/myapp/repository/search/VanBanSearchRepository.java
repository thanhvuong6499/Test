package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.VanBan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the VanBan entity.
 */
public interface VanBanSearchRepository extends ElasticsearchRepository<VanBan, Long> {
}
