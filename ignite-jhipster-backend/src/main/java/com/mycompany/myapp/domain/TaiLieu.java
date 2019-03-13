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

import com.mycompany.myapp.domain.enumeration.TrangThai;

/**
 * A TaiLieu.
 */
@Entity
@Table(name = "tai_lieu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tailieu")
public class TaiLieu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_van_ban")
    private String tenVanBan;

    @Column(name = "tom_tat")
    private String tomTat;

    @Column(name = "u_rl")
    private String uRL;

    @Column(name = "dung_luong")
    private Integer dungLuong;

    @Column(name = "tag")
    private String tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TrangThai status;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tai_lieu_theloaitailieu",
               joinColumns = @JoinColumn(name = "tai_lieus_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "theloaitailieus_id", referencedColumnName = "id"))
    private Set<TheLoaiTaiLieu> theloaitailieus = new HashSet<>();

    @ManyToMany(mappedBy = "tailieus")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GiaoVien> giaoviens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenVanBan() {
        return tenVanBan;
    }

    public TaiLieu tenVanBan(String tenVanBan) {
        this.tenVanBan = tenVanBan;
        return this;
    }

    public void setTenVanBan(String tenVanBan) {
        this.tenVanBan = tenVanBan;
    }

    public String getTomTat() {
        return tomTat;
    }

    public TaiLieu tomTat(String tomTat) {
        this.tomTat = tomTat;
        return this;
    }

    public void setTomTat(String tomTat) {
        this.tomTat = tomTat;
    }

    public String getuRL() {
        return uRL;
    }

    public TaiLieu uRL(String uRL) {
        this.uRL = uRL;
        return this;
    }

    public void setuRL(String uRL) {
        this.uRL = uRL;
    }

    public Integer getDungLuong() {
        return dungLuong;
    }

    public TaiLieu dungLuong(Integer dungLuong) {
        this.dungLuong = dungLuong;
        return this;
    }

    public void setDungLuong(Integer dungLuong) {
        this.dungLuong = dungLuong;
    }

    public String getTag() {
        return tag;
    }

    public TaiLieu tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public TrangThai getStatus() {
        return status;
    }

    public TaiLieu status(TrangThai status) {
        this.status = status;
        return this;
    }

    public void setStatus(TrangThai status) {
        this.status = status;
    }

    public Set<TheLoaiTaiLieu> getTheloaitailieus() {
        return theloaitailieus;
    }

    public TaiLieu theloaitailieus(Set<TheLoaiTaiLieu> theLoaiTaiLieus) {
        this.theloaitailieus = theLoaiTaiLieus;
        return this;
    }

    public TaiLieu addTheloaitailieu(TheLoaiTaiLieu theLoaiTaiLieu) {
        this.theloaitailieus.add(theLoaiTaiLieu);
        theLoaiTaiLieu.getTailieus().add(this);
        return this;
    }

    public TaiLieu removeTheloaitailieu(TheLoaiTaiLieu theLoaiTaiLieu) {
        this.theloaitailieus.remove(theLoaiTaiLieu);
        theLoaiTaiLieu.getTailieus().remove(this);
        return this;
    }

    public void setTheloaitailieus(Set<TheLoaiTaiLieu> theLoaiTaiLieus) {
        this.theloaitailieus = theLoaiTaiLieus;
    }

    public Set<GiaoVien> getGiaoviens() {
        return giaoviens;
    }

    public TaiLieu giaoviens(Set<GiaoVien> giaoViens) {
        this.giaoviens = giaoViens;
        return this;
    }

    public TaiLieu addGiaovien(GiaoVien giaoVien) {
        this.giaoviens.add(giaoVien);
        giaoVien.getTailieus().add(this);
        return this;
    }

    public TaiLieu removeGiaovien(GiaoVien giaoVien) {
        this.giaoviens.remove(giaoVien);
        giaoVien.getTailieus().remove(this);
        return this;
    }

    public void setGiaoviens(Set<GiaoVien> giaoViens) {
        this.giaoviens = giaoViens;
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
        TaiLieu taiLieu = (TaiLieu) o;
        if (taiLieu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taiLieu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaiLieu{" +
            "id=" + getId() +
            ", tenVanBan='" + getTenVanBan() + "'" +
            ", tomTat='" + getTomTat() + "'" +
            ", uRL='" + getuRL() + "'" +
            ", dungLuong=" + getDungLuong() +
            ", tag='" + getTag() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
