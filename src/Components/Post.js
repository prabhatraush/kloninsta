import React from 'react'
import Comment from './Comment';
import Moment from 'react-moment';

function Post(props) {

    const {postID, username, created_at, logged_user, caption, imgURL} = props;
   
    // console.log(postID);
    return (
        <div className="app_post">
            {/* head -> avtar + username */}
            {/* images */}
            {/* username + caption  */}
            <div className="post_header">
                <span>{username[0].toUpperCase()}</span>
                <strong>{username}</strong>
            </div>
            <img 
                src={imgURL}
                alt="first post"
            />
            <div className="post_time">
                Added <Moment fromNow>{new Date(created_at*1000)}</Moment>
            </div>
            <div className="post_footer">
    <p><strong>{username}: </strong> {caption}</p>
            </div>
                <Comment postID={postID} logged_user={logged_user}/>
            
        </div>
    )
}

export default Post
