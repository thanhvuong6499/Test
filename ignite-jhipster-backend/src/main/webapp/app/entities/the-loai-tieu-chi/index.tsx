import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TheLoaiTieuChi from './the-loai-tieu-chi';
import TheLoaiTieuChiDetail from './the-loai-tieu-chi-detail';
import TheLoaiTieuChiUpdate from './the-loai-tieu-chi-update';
import TheLoaiTieuChiDeleteDialog from './the-loai-tieu-chi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TheLoaiTieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TheLoaiTieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TheLoaiTieuChiDetail} />
      <ErrorBoundaryRoute path={match.url} component={TheLoaiTieuChi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TheLoaiTieuChiDeleteDialog} />
  </>
);

export default Routes;
