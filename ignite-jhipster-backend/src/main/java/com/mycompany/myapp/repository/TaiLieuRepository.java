package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TaiLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TaiLieu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaiLieuRepository extends JpaRepository<TaiLieu, Long> {

    @Query(value = "select distinct tai_lieu from TaiLieu tai_lieu left join fetch tai_lieu.theloaitailieus",
        countQuery = "select count(distinct tai_lieu) from TaiLieu tai_lieu")
    Page<TaiLieu> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct tai_lieu from TaiLieu tai_lieu left join fetch tai_lieu.theloaitailieus")
    List<TaiLieu> findAllWithEagerRelationships();

    @Query("select tai_lieu from TaiLieu tai_lieu left join fetch tai_lieu.theloaitailieus where tai_lieu.id =:id")
    Optional<TaiLieu> findOneWithEagerRelationships(@Param("id") Long id);

}
