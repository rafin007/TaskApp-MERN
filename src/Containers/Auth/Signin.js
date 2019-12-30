import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import classes from './Auth.scss';

import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';

class Signin extends Component {
    state = {
        userForm: {
            email: { ...this.inputConfigHandler('email', 'Your Email') },
            password: { ...this.inputConfigHandler('password', 'Your Password') }
        },
        formIsValid: false
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

    render() {

        const formElements = [];

        for (let key in this.state.userForm) {
            formElements.push({
                id: key,
                config: this.state.userForm[key]
            });
        }

        return (
            <div className={classes.AuthForm} >
                <h1 className={classes.header} >Task App</h1>
                <form>
                    {formElements.map(element => <Input touched={element.config.touched} invalid={!element.config.valid} key={element.id} type={element.config.type} placeholder={element.config.placeholder} changed={(event) => { this.onChangedHandler(event, element.id) }} />)}
                </form>
                <Button>Sign in</Button>
                <p style={{ fontSize: '1rem' }} >Sign up <NavLink to="/">here</NavLink> </p>
            </div>
        );
    }
}

export default Signin;