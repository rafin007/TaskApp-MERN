import React from 'react';
import classes from './NavigationItems.scss';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/new-task" >New Task</NavigationItem>
        <NavigationItem link="/tasks" >Tasks</NavigationItem>
    </div>
);

export default navigationItems;