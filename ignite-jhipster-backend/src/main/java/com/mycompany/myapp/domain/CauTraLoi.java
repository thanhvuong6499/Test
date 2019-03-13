package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.MucDiem;

/**
 * A CauTraLoi.
 */
@Entity
@Table(name = "cau_tra_loi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cautraloi")
public class CauTraLoi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "thang_diem")
    private MucDiem thangDiem;

    @ManyToOne
    @JsonIgnoreProperties("")
    private BanDanhGia bandanhgia;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TieuChiDanhGia tieuchidanhgia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MucDiem getThangDiem() {
        return thangDiem;
    }

    public CauTraLoi thangDiem(MucDiem thangDiem) {
        this.thangDiem = thangDiem;
        return this;
    }

    public void setThangDiem(MucDiem thangDiem) {
        this.thangDiem = thangDiem;
    }

    public BanDanhGia getBandanhgia() {
        return bandanhgia;
    }

    public CauTraLoi bandanhgia(BanDanhGia banDanhGia) {
        this.bandanhgia = banDanhGia;
        return this;
    }

    public void setBandanhgia(BanDanhGia banDanhGia) {
        this.bandanhgia = banDanhGia;
    }

    public TieuChiDanhGia getTieuchidanhgia() {
        return tieuchidanhgia;
    }

    public CauTraLoi tieuchidanhgia(TieuChiDanhGia tieuChiDanhGia) {
        this.tieuchidanhgia = tieuChiDanhGia;
        return this;
    }

    public void setTieuchidanhgia(TieuChiDanhGia tieuChiDanhGia) {
        this.tieuchidanhgia = tieuChiDanhGia;
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
        CauTraLoi cauTraLoi = (CauTraLoi) o;
        if (cauTraLoi.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cauTraLoi.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CauTraLoi{" +
            "id=" + getId() +
            ", thangDiem='" + getThangDiem() + "'" +
            "}";
    }
}
