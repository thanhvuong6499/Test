package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TheLoaiVanBan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TheLoaiVanBan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheLoaiVanBanRepository extends JpaRepository<TheLoaiVanBan, Long> {

}
