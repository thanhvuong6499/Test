package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TheLoaiVanBan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TheLoaiVanBan entity.
 */
public interface TheLoaiVanBanSearchRepository extends ElasticsearchRepository<TheLoaiVanBan, Long> {
}
