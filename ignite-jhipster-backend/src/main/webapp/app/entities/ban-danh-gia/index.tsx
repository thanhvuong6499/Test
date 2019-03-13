import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BanDanhGia from './ban-danh-gia';
import BanDanhGiaDetail from './ban-danh-gia-detail';
import BanDanhGiaUpdate from './ban-danh-gia-update';
import BanDanhGiaDeleteDialog from './ban-danh-gia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BanDanhGiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BanDanhGiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BanDanhGiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={BanDanhGia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BanDanhGiaDeleteDialog} />
  </>
);

export default Routes;
