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
            <label style={{ width: "100%" }}>
                {props.type === "message" ?
                    <textarea
                        className='mail-header mail-input-message'
                        onChange={(e) => props.onChangeHandler(e.target.value)}
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        required={props.isRequired}
                        name={props.name}
                    />
                    :
                    <input
                        className='mail-header mail-input'
                        onChange={(e) => props.onChangeHandler(e.target.value)}
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        required={props.isRequired}
                        name={props.name}
                    />
                }
            </label>
        );
    }
};

export default React.memo(InputField);