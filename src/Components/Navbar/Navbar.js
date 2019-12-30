import React from 'react';
import classes from './Navbar.scss';

import NavigationItems from './NavigationItems/NavigationItems';

const navbar = props => (
    <nav className={classes.Navbar} >
        <span className={classes.Navbar__logo} >Task App</span>
        <NavigationItems />
    </nav>
);

export default navbar;