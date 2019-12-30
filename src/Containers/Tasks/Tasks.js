import React, { Component } from 'react';
import classes from './Tasks.scss';
import Task from '../../Components/Task/Task';

class Tasks extends Component {
    state = {

    }

    render() {
        return (
            <div className={classes.Tasks}>
                <p className={classes.header}>Your tasks...</p>
                <Task />
            </div>
        );
    }
}

export default Tasks;