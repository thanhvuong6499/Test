package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TieuChiDanhGia.
 */
@Entity
@Table(name = "tieu_chi_danh_gia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tieuchidanhgia")
public class TieuChiDanhGia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "noi_dung")
    private String noiDung;

    @Column(name = "jhi_level")
    private Integer level;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TheLoaiTieuChi theloaitieuchi;

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

    public TieuChiDanhGia noiDung(String noiDung) {
        this.noiDung = noiDung;
        return this;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Integer getLevel() {
        return level;
    }

    public TieuChiDanhGia level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public TheLoaiTieuChi getTheloaitieuchi() {
        return theloaitieuchi;
    }

    public TieuChiDanhGia theloaitieuchi(TheLoaiTieuChi theLoaiTieuChi) {
        this.theloaitieuchi = theLoaiTieuChi;
        return this;
    }

    public void setTheloaitieuchi(TheLoaiTieuChi theLoaiTieuChi) {
        this.theloaitieuchi = theLoaiTieuChi;
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
        TieuChiDanhGia tieuChiDanhGia = (TieuChiDanhGia) o;
        if (tieuChiDanhGia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tieuChiDanhGia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TieuChiDanhGia{" +
            "id=" + getId() +
            ", noiDung='" + getNoiDung() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
