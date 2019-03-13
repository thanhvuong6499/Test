import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/giao-vien">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Giao Vien
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/tai-lieu">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tai Lieu
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/the-loai-tai-lieu">
      <FontAwesomeIcon icon="asterisk" />&nbsp; The Loai Tai Lieu
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/van-ban">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Van Ban
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/the-loai-van-ban">
      <FontAwesomeIcon icon="asterisk" />&nbsp; The Loai Van Ban
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/co-quan-ban-hanh">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Co Quan Ban Hanh
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/the-loai-tieu-chi">
      <FontAwesomeIcon icon="asterisk" />&nbsp; The Loai Tieu Chi
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cau-tra-loi">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Cau Tra Loi
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/tieu-chi-danh-gia">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tieu Chi Danh Gia
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/ban-danh-gia">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ban Danh Gia
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
