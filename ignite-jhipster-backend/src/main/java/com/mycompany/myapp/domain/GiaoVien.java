package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.CapBacGV;

import com.mycompany.myapp.domain.enumeration.TrangThai;

/**
 * A GiaoVien.
 */
@Entity
@Table(name = "giao_vien")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "giaovien")
public class GiaoVien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "c_mnd")
    private String cMND;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "s_dt")
    private String sDT;

    @Column(name = "ngay_sinh")
    private ZonedDateTime ngaySinh;

    @Column(name = "que_quan")
    private String queQuan;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "email")
    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "dung_luong_kho")
    private Integer dungLuongKho;

    @Column(name = "da_su_dung")
    private Integer daSuDung;

    @Enumerated(EnumType.STRING)
    @Column(name = "cap_bac")
    private CapBacGV capBac;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TrangThai status;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "giao_vien_tailieu",
               joinColumns = @JoinColumn(name = "giao_viens_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tailieus_id", referencedColumnName = "id"))
    private Set<TaiLieu> tailieus = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getcMND() {
        return cMND;
    }

    public GiaoVien cMND(String cMND) {
        this.cMND = cMND;
        return this;
    }

    public void setcMND(String cMND) {
        this.cMND = cMND;
    }

    public String getHoTen() {
        return hoTen;
    }

    public GiaoVien hoTen(String hoTen) {
        this.hoTen = hoTen;
        return this;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getsDT() {
        return sDT;
    }

    public GiaoVien sDT(String sDT) {
        this.sDT = sDT;
        return this;
    }

    public void setsDT(String sDT) {
        this.sDT = sDT;
    }

    public ZonedDateTime getNgaySinh() {
        return ngaySinh;
    }

    public GiaoVien ngaySinh(ZonedDateTime ngaySinh) {
        this.ngaySinh = ngaySinh;
        return this;
    }

    public void setNgaySinh(ZonedDateTime ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getQueQuan() {
        return queQuan;
    }

    public GiaoVien queQuan(String queQuan) {
        this.queQuan = queQuan;
        return this;
    }

    public void setQueQuan(String queQuan) {
        this.queQuan = queQuan;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public GiaoVien diaChi(String diaChi) {
        this.diaChi = diaChi;
        return this;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getEmail() {
        return email;
    }

    public GiaoVien email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public GiaoVien matKhau(String matKhau) {
        this.matKhau = matKhau;
        return this;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public Integer getDungLuongKho() {
        return dungLuongKho;
    }

    public GiaoVien dungLuongKho(Integer dungLuongKho) {
        this.dungLuongKho = dungLuongKho;
        return this;
    }

    public void setDungLuongKho(Integer dungLuongKho) {
        this.dungLuongKho = dungLuongKho;
    }

    public Integer getDaSuDung() {
        return daSuDung;
    }

    public GiaoVien daSuDung(Integer daSuDung) {
        this.daSuDung = daSuDung;
        return this;
    }

    public void setDaSuDung(Integer daSuDung) {
        this.daSuDung = daSuDung;
    }

    public CapBacGV getCapBac() {
        return capBac;
    }

    public GiaoVien capBac(CapBacGV capBac) {
        this.capBac = capBac;
        return this;
    }

    public void setCapBac(CapBacGV capBac) {
        this.capBac = capBac;
    }

    public TrangThai getStatus() {
        return status;
    }

    public GiaoVien status(TrangThai status) {
        this.status = status;
        return this;
    }

    public void setStatus(TrangThai status) {
        this.status = status;
    }

    public Set<TaiLieu> getTailieus() {
        return tailieus;
    }

    public GiaoVien tailieus(Set<TaiLieu> taiLieus) {
        this.tailieus = taiLieus;
        return this;
    }

    public GiaoVien addTailieu(TaiLieu taiLieu) {
        this.tailieus.add(taiLieu);
        taiLieu.getGiaoviens().add(this);
        return this;
    }

    public GiaoVien removeTailieu(TaiLieu taiLieu) {
        this.tailieus.remove(taiLieu);
        taiLieu.getGiaoviens().remove(this);
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
        GiaoVien giaoVien = (GiaoVien) o;
        if (giaoVien.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), giaoVien.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GiaoVien{" +
            "id=" + getId() +
            ", cMND='" + getcMND() + "'" +
            ", hoTen='" + getHoTen() + "'" +
            ", sDT='" + getsDT() + "'" +
            ", ngaySinh='" + getNgaySinh() + "'" +
            ", queQuan='" + getQueQuan() + "'" +
            ", diaChi='" + getDiaChi() + "'" +
            ", email='" + getEmail() + "'" +
            ", matKhau='" + getMatKhau() + "'" +
            ", dungLuongKho=" + getDungLuongKho() +
            ", daSuDung=" + getDaSuDung() +
            ", capBac='" + getCapBac() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
