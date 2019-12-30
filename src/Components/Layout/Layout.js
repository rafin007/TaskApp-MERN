import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';

const layout = props => {
    return (
        <Fragment>
            <Navbar />
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default layout;