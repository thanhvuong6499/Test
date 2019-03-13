package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A BanDanhGia.
 */
@Entity
@Table(name = "ban_danh_gia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "bandanhgia")
public class BanDanhGia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mo_ta")
    private String moTa;

    @ManyToOne
    @JsonIgnoreProperties("")
    private GiaoVien giaovien;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMoTa() {
        return moTa;
    }

    public BanDanhGia moTa(String moTa) {
        this.moTa = moTa;
        return this;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public GiaoVien getGiaovien() {
        return giaovien;
    }

    public BanDanhGia giaovien(GiaoVien giaoVien) {
        this.giaovien = giaoVien;
        return this;
    }

    public void setGiaovien(GiaoVien giaoVien) {
        this.giaovien = giaoVien;
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
        BanDanhGia banDanhGia = (BanDanhGia) o;
        if (banDanhGia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), banDanhGia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BanDanhGia{" +
            "id=" + getId() +
            ", moTa='" + getMoTa() + "'" +
            "}";
    }
}
