package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.BanDanhGia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BanDanhGia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BanDanhGiaRepository extends JpaRepository<BanDanhGia, Long> {

}
