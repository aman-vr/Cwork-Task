import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Dashboard from '../component/Dashboard/Dashboard';
import Homepage from '../component/Dashboard/Homepage';
import AdminDashboard from '../component/Admin/AdminDashboard';
import UserDashboard from '../component/User/UserDashboard';
import CategoryDashboard from '../component/Category/CategoryDashboard';
import ManufacturingDashboard from '../component/Manufacturer/ManufacturingDashboard';
import VehicleDashboard from '../component/Vehicle/VehicleDashboard';
import Navbar from '../common/Navbar';
import { UserDataProvider } from '../store/UserDataContext';

const App = () => {
  return (
    <Fragment>
      <Route component={Homepage} path="/" exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Navbar />
            <UserDataProvider>
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route component={Dashboard} path="/dashboard" />
                  <Route component={AdminDashboard} path="/admin" />
                  <Route component={UserDashboard} path="/user"></Route>
                  <Route component={VehicleDashboard} path="/vehicle" exact />
                  <Route
                    component={ManufacturingDashboard}
                    path="/manufacturer"
                  />
                  <Route component={CategoryDashboard} path="/categories" />
                  {/* <Route component={NotFound} /> */}
                </Switch>
              </Container>
            </UserDataProvider>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(App);
