import React, {useState} from 'react'
import './Modal.css';
import {auth} from '../firebase';

function Login(props) {

    const {closeModal} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setError] = useState(null);

    const handleLogin = (e) =>{
        e.preventDefault();
        setError('');
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
        <div className="model_bck">
            <div className="modal_container">
                <div className="modal_header">
                    <img
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                    />
                    <span className="closeBtn" onClick={closeModal}>x</span>
                </div>
                <form>
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
                    {errmsg ? <div className="err">{errmsg}</div>:""}
                    <button onClick={(e)=>handleLogin(e)}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
