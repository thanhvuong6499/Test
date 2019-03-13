import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TheLoaiVanBan from './the-loai-van-ban';
import TheLoaiVanBanDetail from './the-loai-van-ban-detail';
import TheLoaiVanBanUpdate from './the-loai-van-ban-update';
import TheLoaiVanBanDeleteDialog from './the-loai-van-ban-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TheLoaiVanBanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TheLoaiVanBanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TheLoaiVanBanDetail} />
      <ErrorBoundaryRoute path={match.url} component={TheLoaiVanBan} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TheLoaiVanBanDeleteDialog} />
  </>
);

export default Routes;
