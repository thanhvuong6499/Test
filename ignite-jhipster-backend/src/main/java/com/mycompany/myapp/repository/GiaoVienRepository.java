package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.GiaoVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the GiaoVien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GiaoVienRepository extends JpaRepository<GiaoVien, Long> {

    @Query(value = "select distinct giao_vien from GiaoVien giao_vien left join fetch giao_vien.tailieus",
        countQuery = "select count(distinct giao_vien) from GiaoVien giao_vien")
    Page<GiaoVien> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct giao_vien from GiaoVien giao_vien left join fetch giao_vien.tailieus")
    List<GiaoVien> findAllWithEagerRelationships();

    @Query("select giao_vien from GiaoVien giao_vien left join fetch giao_vien.tailieus where giao_vien.id =:id")
    Optional<GiaoVien> findOneWithEagerRelationships(@Param("id") Long id);

}
