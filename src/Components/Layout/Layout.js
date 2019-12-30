import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

const Layout = props => {

    const [isAuth, setIsAuth] = useState(false)

    let navbar = null;

    useEffect(() => {
        if (props.token) {
            setIsAuth(true);
        }
    }, [props.token]);

    if (isAuth) {
        navbar = <Navbar />;
    }

    return (
        <Fragment>
            {navbar}
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(Layout);