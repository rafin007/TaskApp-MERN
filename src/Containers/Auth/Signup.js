import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import classes from './Auth.scss';

import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Signup extends Component {
    state = {
        userForm: {
            name: { ...this.inputConfigHandler('text', 'Your name') },
            email: { ...this.inputConfigHandler('email', 'Your Email') },
            password: { ...this.inputConfigHandler('password', 'Your Password') },
            age: { ...this.inputConfigHandler('number', 'Your age') }
        },
        formIsValid: false
    }

    componentDidUpdate() {
        if (this.props.token) {
            this.props.history.push('/tasks');
        }
    }

    inputConfigHandler(type, placeholder) {
        return {
            type,
            placeholder,
            value: '',
            valid: false,
            touched: false,
            rules: {
                required: true,
                isEmail: type === 'email' ? true : false,
                minLength: type === 'password' ? 6 : null
            }
        }
    }

    onChangedHandler = (event, id) => {
        const updatedForm = {
            ...this.state.userForm,
            [id]: {
                ...this.state.userForm[id],
                value: event.target.value,
                valid: this.validateElement(this.state.userForm[id].rules, event.target.value),
                touched: true
            }
        };

        let formIsValid = true;
        for (let element in updatedForm) {
            formIsValid = updatedForm[element].valid && formIsValid;
        }

        this.setState({ userForm: updatedForm, formIsValid });
    }

    validateElement = (rules, value) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            isValid = validator.isEmail(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        const data = {
            name: this.state.userForm.name.value,
            email: this.state.userForm.email.value,
            password: this.state.userForm.password.value,
            age: this.state.userForm.age.value
        };

        this.props.onSignup(data);
    }

    render() {

        const formElements = [];

        for (let key in this.state.userForm) {
            formElements.push({
                id: key,
                config: this.state.userForm[key]
            });
        }

        let form = (
            <form onSubmit={this.onSubmitHandler} >
                {formElements.map(element => <Input touched={element.config.touched} invalid={!element.config.valid} key={element.id} type={element.config.type} placeholder={element.config.placeholder} changed={(event) => { this.onChangedHandler(event, element.id) }} />)}
                <Button disabled={this.state.formIsValid} >Sign up</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.AuthForm} >
                <h1 className={classes.header} >Task App</h1>
                {form}
                <p style={{ fontSize: '1rem' }} >Sign in <NavLink to="/signin">here</NavLink> </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.id,
        token: state.token,
        loading: state.loading,
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (data) => dispatch(actions.signup(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);