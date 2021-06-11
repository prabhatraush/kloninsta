import React, {useState, useEffect} from 'react'
import Moment from 'react-moment';
import {db} from '../firebase'
import {SendIcon} from './Logo/Logos';

function Comment(props) {

    const {postID, logged_user} = props;
    const [comments, setComments] = useState([]);
    const [new_comment, setComment] = useState('');
    const [err, setError] = useState(null);

    const handleComment = (e) =>{
        e.preventDefault();
        console.log(new_comment);
        if(new_comment!=='')
        db.collection('posts')
            .doc(postID)
            .collection('comments')
            .add({
                timestamp: new Date(),
                comment:new_comment,
                username:logged_user.displayName
            })
            .then(()=>{
                setComment('');
            })
            .catch(err=>{
                setError('Something went wrong !', err);
            })
        else
        setError('comment will not be empty');
    }

    useEffect(()=>{
       const fetchComments = ()=>{
            db.collection('posts')
            .doc(postID)
            .collection('comments')
            .orderBy('timestamp')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=> doc.data()));
            });
       }

       fetchComments();
    },[postID])

    console.log(comments);

    return (
        <div>
            {
                comments &&
                comments.map((comment,i)=>{
                return <div className="comment_list" key={i}>
                    <div className="comment_text"><strong>{comment.username}</strong> {comment.comment}</div>
                    <div className="comment_time"><Moment fromNow>{new Date((comment.timestamp.seconds)*1000)}</Moment></div></div>
                })
            }
            {
                err && 
                <div className="err">{err}</div>
            }
            { logged_user ?
                <form className="post_comment">
                    <input
                        type="text"
                        value={new_comment}
                        onChange={(e)=>
                            {
                                setError(null);
                                setComment(e.target.value)
                            }}
                        placeholder="Add a comment"
                    />
                    <span onClick={(e)=>handleComment(e)}><SendIcon/></span>
                </form>
                :
                <div className="err">Please login to add a comment.. </div>
            }
        </div>
    )
}

export default Comment
