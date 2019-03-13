import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GiaoVien from './giao-vien';
import GiaoVienDetail from './giao-vien-detail';
import GiaoVienUpdate from './giao-vien-update';
import GiaoVienDeleteDialog from './giao-vien-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GiaoVienUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GiaoVienUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GiaoVienDetail} />
      <ErrorBoundaryRoute path={match.url} component={GiaoVien} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GiaoVienDeleteDialog} />
  </>
);

export default Routes;
