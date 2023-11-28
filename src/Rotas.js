import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Perguntas from './Perguntas';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/Home" exact component={Home} />
      <Route path="/perguntas" component={Perguntas} />
    </Switch>
  </Router>
);

export default Routes;

