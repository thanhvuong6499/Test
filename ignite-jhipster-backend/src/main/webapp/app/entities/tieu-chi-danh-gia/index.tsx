import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TieuChiDanhGia from './tieu-chi-danh-gia';
import TieuChiDanhGiaDetail from './tieu-chi-danh-gia-detail';
import TieuChiDanhGiaUpdate from './tieu-chi-danh-gia-update';
import TieuChiDanhGiaDeleteDialog from './tieu-chi-danh-gia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TieuChiDanhGiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TieuChiDanhGiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TieuChiDanhGiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={TieuChiDanhGia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TieuChiDanhGiaDeleteDialog} />
  </>
);

export default Routes;
