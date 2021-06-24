import React, {useState} from 'react'
import './Modal.css';
import Modal from './Modal';
import {auth} from '../firebase';

function Login(props) {

    const {closeModal} = props;

    const [email, setEmail] = useState('');
    const [errmsg, setError] = useState(null);
    const [msg, setMsg] = useState('');

    const handleResetPassword = (e) =>{
        e.preventDefault();
        setError('');
        if(!email){
            setError("Email can't be empty");
            return;
        }
        auth.sendPasswordResetEmail(email)
        .then((res)=>{
            console.log(res);
            setMsg('Reset password is sent to your email!');
        })
        .catch(error=>{
           // console.log(error.message);
            setError(error.message)
        })
    }

    return (
        <Modal closeModal = {closeModal}>
            <div className="form_header">
                Reset Password
            </div>
            <input 
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your registered email"    
            />
            <button onClick={(e)=>handleResetPassword(e)}>Reset</button>
            {msg ? <div className="success">{msg} !!</div>:""}
            {errmsg ? <div className="err">{errmsg} !!</div>:""}
        </Modal>
    )
}

export default Login
