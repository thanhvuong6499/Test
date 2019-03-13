package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.CauTraLoi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CauTraLoi entity.
 */
public interface CauTraLoiSearchRepository extends ElasticsearchRepository<CauTraLoi, Long> {
}
