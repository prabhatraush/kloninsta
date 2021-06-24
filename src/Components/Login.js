import React, {useState} from 'react'
import './Modal.css';
import Modal from './Modal';
import {auth} from '../firebase';

function Login(props) {

    const {closeModal} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setError] = useState(null);

    const handleLogin = (e) =>{
        e.preventDefault();
        setError('');
        if(!email || !password){
            setError("Neither email or password can't be empty");
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
            closeModal();
        })
        .catch(error=>{
           // console.log(error.message);
            setError(error.message)
        })
    }

    return (
        <Modal closeModal={closeModal}>
            <div className="form_header">
                Login
            </div>
            <input 
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"    
            />
            <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"    
            />
            <button onClick={(e)=>handleLogin(e)}>Login</button>
            {errmsg ? <div className="err">{errmsg}</div>:""}
{/* 
            <p>Don't have an account?<span color="blue">Sign up</span> </p>
            <p>Forgot your password?<span color="blue">Reset Here</span> </p> */}
        </Modal>
    )
}

export default Login
