import React from 'react';
import classes from './Button.scss';

const button = props => (
    <button className={classes.Button} >{props.children}</button>
);

export default button;