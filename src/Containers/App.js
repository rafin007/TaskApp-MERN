import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './App.scss';

import Layout from '../Components/Layout/Layout';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import NewTask from './NewTask/NewTask';
import Tasks from './Tasks/Tasks';

class App extends Component {

  state = {
    isAuth: true
  }

  render() {

    let route = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/" exact component={Signup} />
      </Switch>
    );

    if (this.state.isAuth) {
      route = (
        <Switch>
          <Route path="/new-task" component={NewTask} />
          <Route path="/tasks" exact component={Tasks} />
        </Switch>
      );
    }

    return (
      <div className={classes.App}>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

export default App;
