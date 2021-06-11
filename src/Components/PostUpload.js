import React, {useState} from 'react'
import {storage, db} from '../firebase';

function PostUpload(props) {

    const {username} = props;
    const [caption, setCaption] = useState('');
    const [photo, setUploadImg] = useState('');
    const [progress, setProgress] = useState(0);
    const [errmsg, setError] = useState(null);

    const handleUploadPost = (e) =>{
        e.preventDefault();

        if(caption==='')
        {
            setError('Caption should not be empty !!');
            console.log(photo);
        }
        if(photo.size<(512*1024))
        {
            const uploadPhoto = storage.ref(`photos/${photo.name}`).put(photo);
        uploadPhoto.on(
            "state_changed",
            (snapshot) =>{
                // progress function 
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                console.log("Progress:"+ progress);
                setProgress(progress);

            },
            (error)=>{
                //error function
                setError(error.message);
                //alert(error.message);
            },
            ()=>{
                // complete function 
                storage
                    .ref('photos')
                    .child(photo.name)
                    .getDownloadURL()
                    .then( url =>{
                        db.collection('posts').add({
                            created_at: new Date(),
                            caption: caption,
                            imgURL: url,
                            username: username
                        })
                        setProgress(0);
                        setCaption('');
                        setUploadImg('');
                    })
            }
        )
        }
        else{
            setError('Photo upload limit exceeds!!\n Must be less than 0.5MB')
            //alert('Photo upload limit exceeds!!\n Must be less than 0.5MB');
        }
    }

    return (
        <div className="add_post">
            <textarea 
                type="text"
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                placeholder={"Hey! "+username+", whats on your mind ? "} 
            ></textarea>
            <input 
                type="file"
                onChange={(e)=>{
                    console.log(e.target.files);
                    setUploadImg(e.target.files[0])
                }}
                accept="image/x-png,image/gif,image/jpeg"
            />
            <label> {photo ? photo.name : "+ add photo"} </label> 
            
            {
                errmsg ?
                <div className="err">{errmsg}</div>
                :
                <progress value={progress} max="100"/>
            }
            <button onClick={(e)=>handleUploadPost(e)}>Upload Post</button>
        </div>
    )
}

export default PostUpload
