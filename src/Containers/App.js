import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './App.scss';

import Layout from '../Components/Layout/Layout';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import NewTask from './NewTask/NewTask';
import Tasks from './Tasks/Tasks';

class App extends Component {

  state = {
    isAuth: false
  }


  componentDidUpdate(prevProps, prevState) {
    //if the previous global token is changed
    if (prevProps.token !== this.props.token) {
      if (this.props.token) {
        this.setState({ isAuth: true });
      }
    }
  }


  render() {

    let route = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/" exact component={Signup} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.state.isAuth) {
      route = (
        <Switch>
          <Route path="/new-task" component={NewTask} />
          <Route path="/tasks" exact component={Tasks} />
          <Redirect to="/" />
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

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(withRouter(App));
