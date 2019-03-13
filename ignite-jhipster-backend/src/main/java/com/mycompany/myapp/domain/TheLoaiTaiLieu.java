package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TheLoaiTaiLieu.
 */
@Entity
@Table(name = "the_loai_tai_lieu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "theloaitailieu")
public class TheLoaiTaiLieu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "noi_dung")
    private String noiDung;

    @ManyToMany(mappedBy = "theloaitailieus")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaiLieu> tailieus = new HashSet<>();

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

    public TheLoaiTaiLieu noiDung(String noiDung) {
        this.noiDung = noiDung;
        return this;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Set<TaiLieu> getTailieus() {
        return tailieus;
    }

    public TheLoaiTaiLieu tailieus(Set<TaiLieu> taiLieus) {
        this.tailieus = taiLieus;
        return this;
    }

    public TheLoaiTaiLieu addTailieu(TaiLieu taiLieu) {
        this.tailieus.add(taiLieu);
        taiLieu.getTheloaitailieus().add(this);
        return this;
    }

    public TheLoaiTaiLieu removeTailieu(TaiLieu taiLieu) {
        this.tailieus.remove(taiLieu);
        taiLieu.getTheloaitailieus().remove(this);
        return this;
    }

    public void setTailieus(Set<TaiLieu> taiLieus) {
        this.tailieus = taiLieus;
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
        TheLoaiTaiLieu theLoaiTaiLieu = (TheLoaiTaiLieu) o;
        if (theLoaiTaiLieu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theLoaiTaiLieu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheLoaiTaiLieu{" +
            "id=" + getId() +
            ", noiDung='" + getNoiDung() + "'" +
            "}";
    }
}
