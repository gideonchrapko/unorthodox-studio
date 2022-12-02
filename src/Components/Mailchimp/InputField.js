import React from 'react';

const InputField = props => {
  const validateInput = values => {
        if (values.some(f => f === "") || values[0].indexOf("@") === -1) {
            return true
        } else {
            return false
        }
    }
    if (props.type === "submit") {
        return (
            <input
                className='mail-header mail-button'
                type='submit'
                value={props.label}
                disabled={validateInput(props.formValues)}
            />
        )
    } else {
        return (
            <label>
                <input
                    className={props.type === "message" ? 'mail-header mail-input-message' : 'mail-header mail-input'}
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    required={props.isRequired}
                    name={props.name}
                />
            </label>
        );
    }
};

export default React.memo(InputField);