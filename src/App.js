import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut/SignOut';
import AuthType from './constants';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route
              path="/sign-up"
              render={(props) => (
                <Auth {...props} authType={AuthType.SIGN_UP} />
              )}
            />
            <Route
              path="/sign-in"
              render={(props) => (
                <Auth {...props} authType={AuthType.SIGN_IN} />
              )}
            />
            <Route
              path="/sign-up"
              render={(props) => (
                <Auth {...props} authType={AuthType.SIGN_UP} />
              )}
            />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
