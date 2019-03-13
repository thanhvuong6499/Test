import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TheLoaiTaiLieu from './the-loai-tai-lieu';
import TheLoaiTaiLieuDetail from './the-loai-tai-lieu-detail';
import TheLoaiTaiLieuUpdate from './the-loai-tai-lieu-update';
import TheLoaiTaiLieuDeleteDialog from './the-loai-tai-lieu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TheLoaiTaiLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TheLoaiTaiLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TheLoaiTaiLieuDetail} />
      <ErrorBoundaryRoute path={match.url} component={TheLoaiTaiLieu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TheLoaiTaiLieuDeleteDialog} />
  </>
);

export default Routes;
