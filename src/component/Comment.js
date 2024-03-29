import { useState } from 'react';
import axios from 'axios'

const Post=(props)=> {

    const [author,setAuthor]=useState('');
    const [content,setContent]=useState('');

    const postId=props.postId

    // Handle post comment method
    const postComment =()=>{
        axios({
            method:'POST',
            data:{
                author: author,
                content: content,
                refered_post: postId,
            },
            url:`https://blog-api-6m73.onrender.com/post/${postId}`,
            withCredentials: false
        })
    }

    // Handle submit comment
    const submitNewComment=()=>{
        postComment()
        props.setFetchNew(true) // When fetch new is true, useEffect will update the component
        setContent('') // Clean up Content input 
        setAuthor('') // Clean up Author input 
    }

    return (
        <div className='container comment-body mb-3'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h3>Write a comment</h3>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" placeholder="Author" onChange={(event)=>setAuthor(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea type="text" rows="3" className="form-control" id="content" placeholder="Content" onChange={(event)=>setContent(event.target.value)}/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-dark btn-sm mt-3" onClick={submitNewComment} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
