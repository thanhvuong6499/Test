package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.TrangThai;

/**
 * A VanBan.
 */
@Entity
@Table(name = "van_ban")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "vanban")
public class VanBan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_vanban")
    private String tenVanban;

    @Column(name = "tom_tat")
    private String tomTat;

    @Column(name = "u_rl")
    private String uRL;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TrangThai status;

    @ManyToOne
    @JsonIgnoreProperties("")
    private CoQuanBanHanh coquanbanhanh;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TheLoaiVanBan theloaivanban;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenVanban() {
        return tenVanban;
    }

    public VanBan tenVanban(String tenVanban) {
        this.tenVanban = tenVanban;
        return this;
    }

    public void setTenVanban(String tenVanban) {
        this.tenVanban = tenVanban;
    }

    public String getTomTat() {
        return tomTat;
    }

    public VanBan tomTat(String tomTat) {
        this.tomTat = tomTat;
        return this;
    }

    public void setTomTat(String tomTat) {
        this.tomTat = tomTat;
    }

    public String getuRL() {
        return uRL;
    }

    public VanBan uRL(String uRL) {
        this.uRL = uRL;
        return this;
    }

    public void setuRL(String uRL) {
        this.uRL = uRL;
    }

    public TrangThai getStatus() {
        return status;
    }

    public VanBan status(TrangThai status) {
        this.status = status;
        return this;
    }

    public void setStatus(TrangThai status) {
        this.status = status;
    }

    public CoQuanBanHanh getCoquanbanhanh() {
        return coquanbanhanh;
    }

    public VanBan coquanbanhanh(CoQuanBanHanh coQuanBanHanh) {
        this.coquanbanhanh = coQuanBanHanh;
        return this;
    }

    public void setCoquanbanhanh(CoQuanBanHanh coQuanBanHanh) {
        this.coquanbanhanh = coQuanBanHanh;
    }

    public TheLoaiVanBan getTheloaivanban() {
        return theloaivanban;
    }

    public VanBan theloaivanban(TheLoaiVanBan theLoaiVanBan) {
        this.theloaivanban = theLoaiVanBan;
        return this;
    }

    public void setTheloaivanban(TheLoaiVanBan theLoaiVanBan) {
        this.theloaivanban = theLoaiVanBan;
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
        VanBan vanBan = (VanBan) o;
        if (vanBan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vanBan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VanBan{" +
            "id=" + getId() +
            ", tenVanban='" + getTenVanban() + "'" +
            ", tomTat='" + getTomTat() + "'" +
            ", uRL='" + getuRL() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
