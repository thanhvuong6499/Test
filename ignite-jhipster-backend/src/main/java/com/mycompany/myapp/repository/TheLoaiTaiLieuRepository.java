package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TheLoaiTaiLieu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TheLoaiTaiLieu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheLoaiTaiLieuRepository extends JpaRepository<TheLoaiTaiLieu, Long> {

}
