//    const url = "https://gmail.us10.list-manage.com/subscribe/post?u=f44c41b585cf2ea8136952a5f&amp;id=b1506a89aa&amp;f_id=001730e2f0"

import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import InputField from "./InputField";

import './Mailchimp.css'

const CustomForm = ({ status, message, onValidated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [yourMessage, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            MERGE0: email,
            MERGE1: name,
            MERGE2: yourMessage
        });
    }
    useEffect(() => {
        if(status === "success") clearFields();
    }, [status])
    const clearFields = () => {
        setEmail('');
        setName('');
        setMessage('');
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <h5 className='mail-header'>
                {/* LIVE__FROM__THE__FUTURE */}
            </h5>
            {status === "sending" && (
                <div className='mail-header'>sending...</div>
            )}
            {status === "error" && (
                <div className='mail-header' dangerouslySetInnerHTML={{ __html: message }} />
            )}
            {status === "success" && (
                <div className='mail-header'>SUCCESS__THANK YOU</div>
            )}
            {status !== "success" ? (
                <>
                    <h5 className='header-text'>Name</h5>
                    <div className="inputTextStyling">
                        <InputField
                            label="Name"
                            onChangeHandler={setName}
                            type="name"
                            value={name}
                            isRequired
                            // placeholder="Your Name"
                        />
                    </div>
                    <h5 className='header-text'>Email</h5>
                    <div className="inputTextStyling">
                        <InputField
                            label="Email"
                            onChangeHandler={setEmail}
                            type="email"
                            value={email}
                            isRequired
                            // placeholder="Your Email"
                        />
                    </div>
                    <h5 className='header-text'>Message</h5>
                    <div className="inputTextStyling">
                        <InputField
                            label="Message"
                            onChangeHandler={setMessage}
                            type="message"
                            value={yourMessage}
                            isRequired
                            // placeholder="Your Message"
                        />
                    </div>
                </>
            ) : null}
            {status !== 'success' ? 
                <div>
                    <InputField
                        label="ENTER"
                        type="submit"
                        formValues={[email]}
                    />
                </div> : null
            }
        </form>
    );
};


const MailchimpForm = props => {
    const url = `https://gmail.us10.list-manage.com/subscribe/post?u=f44c41b585cf2ea8136952a5f&amp;id=b1506a89aa&amp;f_id=001730e2f0`;
    return (
        <div className="formDiv">
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>

    )
}

export default MailchimpForm;