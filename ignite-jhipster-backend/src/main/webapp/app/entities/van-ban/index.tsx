import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VanBan from './van-ban';
import VanBanDetail from './van-ban-detail';
import VanBanUpdate from './van-ban-update';
import VanBanDeleteDialog from './van-ban-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VanBanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VanBanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VanBanDetail} />
      <ErrorBoundaryRoute path={match.url} component={VanBan} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VanBanDeleteDialog} />
  </>
);

export default Routes;
