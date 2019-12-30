import React from 'react';
import classes from './Input.scss';

const input = props => {

    let inputElement = null;

    let inputClass = [classes.Input__element];

    if (props.invalid && props.touched) {
        inputClass.push(classes.invalid);
    }
    else if (!props.invalid && props.touched) {
        inputClass.push(classes.valid);
    }

    switch (props.type) {
        case "text":
            inputElement = <input type={props.type} placeholder={props.placeholder} className={inputClass.join(' ')} onChange={props.changed} />;
            break;

        case "select":
            inputElement = (
                <select onChange={props.changed} className={inputClass.join(' ')} >
                    {props.options.map(option => {
                        if (option === 'Status') {
                            return <option key={option} value="" >{option}</option>
                        }
                        return <option key={option} value={option} >{option}</option>
                    })}
                </select>
            );
            break;

        default:
            inputElement = <input type={props.type} placeholder={props.placeholder} className={inputClass.join(' ')} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input} >
            {inputElement}
        </div>
    );
};

export default input;