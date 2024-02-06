//    const url = "https://gmail.us10.list-manage.com/subscribe/post?u=f44c41b585cf2ea8136952a5f&amp;id=b1506a89aa&amp;f_id=001730e2f0"

import React, {useState, useEffect} from 'react';
// import MailchimpSubscribe from "react-mailchimp-subscribe"
// import InputField from "./InputField";

import './Mailchimp.css'

const MailchimpForm = ({ status, message, onValidated }) => {
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
        <form action="https://submit-form.com/SYvpKRTOB">
            <h5 className='mail-header'>
            </h5>
                <>
                <input
    type="hidden"
    name="_redirect"
    value="https://unorthodoxstudio.ca/contact"
  />
                    <h5 className='header-text'>Name</h5>
                    <div className="inputTextStyling">
                    <input className='mail-header mail-input' type="name" isRequired value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <h5 className='header-text'>Email</h5>
                    <div className="inputTextStyling">
                    <input className='mail-header mail-input' type="email" isRequired value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <h5 className='header-text'>Message</h5>
                    <div className="inputTextStyling">
                        <textarea className='mail-header mail-input-message' type="email" isRequired value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                </>
                <button type="submit" className='mail-header mail-button' style={{ width: "100%"}}>
                    SEND
                </button>
        </form>
    );
};

// const MailchimpForm = props => {
//     const url = `https://us10.list-manage.com/contact-form?u=f44c41b585cf2ea8136952a5f&form_id=2253a42dc482763c9bcdb4943c0521c3`;
//     return (
//         <div className="formDiv">
//             <MailchimpSubscribe
//                 url={url}
//                 render={({ subscribe, status, message }) => (
//                     <CustomForm
//                         status={status}
//                         message={message}
//                         onValidated={formData => subscribe(formData)}
//                     />
//                 )}
//             />
//         </div>

//     )
// }

export default MailchimpForm;