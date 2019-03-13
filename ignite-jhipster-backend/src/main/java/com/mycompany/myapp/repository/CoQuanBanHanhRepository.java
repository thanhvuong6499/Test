package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CoQuanBanHanh;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CoQuanBanHanh entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoQuanBanHanhRepository extends JpaRepository<CoQuanBanHanh, Long> {

}
