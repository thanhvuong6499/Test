import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CauTraLoi from './cau-tra-loi';
import CauTraLoiDetail from './cau-tra-loi-detail';
import CauTraLoiUpdate from './cau-tra-loi-update';
import CauTraLoiDeleteDialog from './cau-tra-loi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CauTraLoiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CauTraLoiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CauTraLoiDetail} />
      <ErrorBoundaryRoute path={match.url} component={CauTraLoi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CauTraLoiDeleteDialog} />
  </>
);

export default Routes;
