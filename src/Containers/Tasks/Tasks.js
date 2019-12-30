import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Tasks.scss';
import Task from '../../Components/Task/Task';

class Tasks extends Component {
    state = {

    }

    render() {
        return (
            <div className={classes.Tasks}>
                <p className={classes.header}>Welcome {this.props.name}!</p>
                <Task />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.id,
        name: state.name
    };
};

export default connect(mapStateToProps)(Tasks);