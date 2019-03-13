package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CauTraLoi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CauTraLoi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CauTraLoiRepository extends JpaRepository<CauTraLoi, Long> {

}
