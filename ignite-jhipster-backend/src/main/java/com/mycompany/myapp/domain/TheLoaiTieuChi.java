package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TheLoaiTieuChi.
 */
@Entity
@Table(name = "the_loai_tieu_chi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "theloaitieuchi")
public class TheLoaiTieuChi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "noi_dung")
    private String noiDung;

    @Column(name = "jhi_level")
    private Integer level;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public TheLoaiTieuChi noiDung(String noiDung) {
        this.noiDung = noiDung;
        return this;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Integer getLevel() {
        return level;
    }

    public TheLoaiTieuChi level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
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
        TheLoaiTieuChi theLoaiTieuChi = (TheLoaiTieuChi) o;
        if (theLoaiTieuChi.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theLoaiTieuChi.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheLoaiTieuChi{" +
            "id=" + getId() +
            ", noiDung='" + getNoiDung() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
