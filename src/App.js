import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import Login from './Components/Login';
import Signup from './Components/Signup';

import {auth, db} from './firebase';
import PostUpload from './Components/PostUpload';



function App() {
  const [posts, setPosts] = useState([]);
  const [showSignUp, showSignupModel] = useState(false);
  const [showLogin, showLoginModel] = useState(false);
  const [user, setCurrentUser] = useState('');

  const logOut = () =>{
    auth.signOut();
  }

  useEffect(() => {
    db.collection('posts').orderBy('created_at','desc').onSnapshot(response=>{
      setPosts(response.docs.map(doc=>({
        id: doc.id,
        post: doc.data()
      })));
    })

    auth.onAuthStateChanged(authUser=>{
      setCurrentUser(authUser);
    })
    
  }, [])

  if(posts.length>0)
  console.log(posts[0].id);

  return (
    <div className="app">
      <div className="app_header" >
        <img 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
       {
         user ?
         <div className="app_nav">
          <button onClick={()=>logOut()}>Logout</button>
        </div> :
        <div className="app_nav">
          <button onClick={()=>showLoginModel(true)}>Login</button>
          <button onClick={()=>showSignupModel(true)}>Signup</button>
        </div>
       }
      </div>
      {
        showSignUp &&
        <Signup closeModal={() => showSignupModel(false)}/>
      }
      {
        showLogin &&
        <Login closeModal={() => showLoginModel(false)}/>
      }

      {
        user ?
        <PostUpload username={user.displayName}/>
        :
        <div className="err">Please login to publish a post..</div>
      }

      {
        posts && 
        posts.map(({post, id}) =>{
          return <Post  key={id} postID={id} logged_user={user} created_at={post.created_at.seconds} username={post.username} caption={post.caption} imgURL={post.imgURL}/>
        })
      }
    </div>
  );
}

export default App;
