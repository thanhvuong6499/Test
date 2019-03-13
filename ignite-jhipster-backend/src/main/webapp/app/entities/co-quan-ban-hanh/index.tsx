import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CoQuanBanHanh from './co-quan-ban-hanh';
import CoQuanBanHanhDetail from './co-quan-ban-hanh-detail';
import CoQuanBanHanhUpdate from './co-quan-ban-hanh-update';
import CoQuanBanHanhDeleteDialog from './co-quan-ban-hanh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoQuanBanHanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoQuanBanHanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoQuanBanHanhDetail} />
      <ErrorBoundaryRoute path={match.url} component={CoQuanBanHanh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CoQuanBanHanhDeleteDialog} />
  </>
);

export default Routes;
