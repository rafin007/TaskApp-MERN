import React from 'react';
import classes from './NavigationItem.scss';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
    <div className={classes.nav} >
        <NavLink to={props.link} exact={props.exact} className={classes.NavigationItem} activeClassName={classes.active} >{props.children}</NavLink>
    </div>
);

export default navigationItem;