import React, { Component } from 'react';
import classes from './NewTask.scss';

import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';

class NewTask extends Component {

    state = {
        taskForm: {
            description: { ...this.inputConfigHandler('text', 'Task description') },
            status: { ...this.inputConfigHandler('select', '') }
        },
        formIsValid: false
    }

    inputConfigHandler(type, placeholder) {
        return {
            type,
            placeholder,
            value: '',
            valid: false,
            touched: false
        }
    }

    onChangedHandler = (event, id) => {
        const updatedForm = {
            ...this.state.taskForm,
            [id]: {
                ...this.state.taskForm[id],
                value: event.target.value,
                valid: this.validateElement(this.state.taskForm[id].type, event.target.value),
                touched: true
            }
        };

        let formIsValid = true;
        for (let element in updatedForm) {
            formIsValid = updatedForm[element].valid && formIsValid;
        }

        this.setState({ taskForm: updatedForm, formIsValid });
    }

    validateElement = (type, value) => {
        let isValid = true;
        if (value.trim() === '') {
            isValid = false;
        }
        return isValid;
    }

    render() {

        const formElements = [];

        for (let key in this.state.taskForm) {
            formElements.push({
                id: key,
                config: this.state.taskForm[key]
            });
        }

        return (
            <div className={classes.TaskForm} >
                <h1 className={classes.header} >Create a new task here</h1>
                <form>
                    {formElements.map(element => <Input touched={element.config.touched} invalid={!element.config.valid} key={element.id} type={element.config.type} placeholder={element.config.placeholder} options={['Status', 'Complete', 'Incomplete']} changed={(event) => { this.onChangedHandler(event, element.id) }} />)}
                </form>
                <Button disabled={this.state.formIsValid} >Create</Button>
            </div>
        );
    }
}

export default NewTask;