import React, { useState } from 'react'
import './Modal.css';
import {auth} from '../firebase';

function Signup(props) {

    const {closeModal} = props;

    const [username, setUsername]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setError] = useState(null);

    const handleSignUp = (e)=>{
        e.preventDefault();
        setError('');
       auth.createUserWithEmailAndPassword(email, password)
       .then((authUser)=>{
           console.log(authUser)
           authUser.user.updateProfile({
               displayName : username
           })
           closeModal(false);
           alert('Users Signup Successfully');
       })
       .catch(error=>setError(error.message));
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
                        SignUp
                    </div>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder="Username"    
                    />
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
                    { errmsg ? <div className="err">{errmsg}</div>:""}
                    <button onClick={(e)=>handleSignUp(e)}>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
