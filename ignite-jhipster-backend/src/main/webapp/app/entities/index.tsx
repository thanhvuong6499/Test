import * as React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GiaoVien from './giao-vien';
import TaiLieu from './tai-lieu';
import TheLoaiTaiLieu from './the-loai-tai-lieu';
import VanBan from './van-ban';
import TheLoaiVanBan from './the-loai-van-ban';
import CoQuanBanHanh from './co-quan-ban-hanh';
import TheLoaiTieuChi from './the-loai-tieu-chi';
import CauTraLoi from './cau-tra-loi';
import TieuChiDanhGia from './tieu-chi-danh-gia';
import BanDanhGia from './ban-danh-gia';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/giao-vien`} component={GiaoVien} />
      <ErrorBoundaryRoute path={`${match.url}/tai-lieu`} component={TaiLieu} />
      <ErrorBoundaryRoute path={`${match.url}/the-loai-tai-lieu`} component={TheLoaiTaiLieu} />
      <ErrorBoundaryRoute path={`${match.url}/van-ban`} component={VanBan} />
      <ErrorBoundaryRoute path={`${match.url}/the-loai-van-ban`} component={TheLoaiVanBan} />
      <ErrorBoundaryRoute path={`${match.url}/co-quan-ban-hanh`} component={CoQuanBanHanh} />
      <ErrorBoundaryRoute path={`${match.url}/the-loai-tieu-chi`} component={TheLoaiTieuChi} />
      <ErrorBoundaryRoute path={`${match.url}/cau-tra-loi`} component={CauTraLoi} />
      <ErrorBoundaryRoute path={`${match.url}/tieu-chi-danh-gia`} component={TieuChiDanhGia} />
      <ErrorBoundaryRoute path={`${match.url}/ban-danh-gia`} component={BanDanhGia} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
