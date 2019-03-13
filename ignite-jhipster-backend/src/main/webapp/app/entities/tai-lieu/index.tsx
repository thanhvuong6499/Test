import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TaiLieu from './tai-lieu';
import TaiLieuDetail from './tai-lieu-detail';
import TaiLieuUpdate from './tai-lieu-update';
import TaiLieuDeleteDialog from './tai-lieu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TaiLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TaiLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TaiLieuDetail} />
      <ErrorBoundaryRoute path={match.url} component={TaiLieu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TaiLieuDeleteDialog} />
  </>
);

export default Routes;
