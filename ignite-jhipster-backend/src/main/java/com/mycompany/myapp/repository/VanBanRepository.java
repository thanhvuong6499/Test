package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.VanBan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VanBan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VanBanRepository extends JpaRepository<VanBan, Long> {

}
