package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TieuChiDanhGia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TieuChiDanhGia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TieuChiDanhGiaRepository extends JpaRepository<TieuChiDanhGia, Long> {

}
