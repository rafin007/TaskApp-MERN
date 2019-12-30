import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Task.scss';

const task = props => {
    return (
        <div className={classes.Task} >
            <p className={classes.detail} >Description: Something</p>
            <p className={classes.detail} >Status: Completed</p>
            <div>
                <NavLink to={{
                    pathname: '/task',
                    task: { id: 'something' }
                }} >Edit</NavLink>
                <NavLink to="/somethingelse" >Delete</NavLink>
            </div>
        </div>
    );
}

export default task;