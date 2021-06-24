import React, { useState } from 'react'
import './Modal.css';
import Modal from './Modal';
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
        if(!username || !email || !password){
            setError("Neither username, email or password can't be empty");
            return;
        }
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
        <Modal closeModal = {closeModal}>
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
            <button onClick={(e)=>handleSignUp(e)}>Signup</button>
            { errmsg ? <div className="err">{errmsg}</div>:""}
        </Modal>
    )
}

export default Signup
