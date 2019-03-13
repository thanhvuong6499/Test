package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CoQuanBanHanh.
 */
@Entity
@Table(name = "co_quan_ban_hanh")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "coquanbanhanh")
public class CoQuanBanHanh implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_co_quan")
    private String tenCoQuan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenCoQuan() {
        return tenCoQuan;
    }

    public CoQuanBanHanh tenCoQuan(String tenCoQuan) {
        this.tenCoQuan = tenCoQuan;
        return this;
    }

    public void setTenCoQuan(String tenCoQuan) {
        this.tenCoQuan = tenCoQuan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CoQuanBanHanh coQuanBanHanh = (CoQuanBanHanh) o;
        if (coQuanBanHanh.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coQuanBanHanh.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CoQuanBanHanh{" +
            "id=" + getId() +
            ", tenCoQuan='" + getTenCoQuan() + "'" +
            "}";
    }
}
