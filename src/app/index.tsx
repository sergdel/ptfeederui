import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { ConfigurationApp } from 'app/containers/ConfigurationApp';

export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
          <Route path="/" component={ConfigurationApp} />
      </Switch>
    </Router>
  </Root>
));