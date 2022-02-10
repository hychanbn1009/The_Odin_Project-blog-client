import { useState } from "react";
import axios from 'axios'
import '../assets/styles/Post.css';
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const Post=(props)=> {

    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [publish,setPublish]=useState(false);


    const fetchPost =()=>{
        console.log(title,content,publish)
        axios({
            method:'POST',
            data:{
                author: props.userData.username,
                title: title,
                content: content,
                publish: publish,
            },
            url:'https://lit-temple-22800.herokuapp.com/post',
            withCredentials: true
        }).then((res)=>console.log(res.data))
    }

    const navigate = useNavigate(); 

    const contentOnChange=(PostContent)=>{
        setContent(PostContent)
    }

    const submitPost=()=>{
        fetchPost();
        setTimeout(() => 
        navigate('/')
        , 1500);
    }

    return (
        
        <div className='container display-post'>
            <div className='row justify-content-center'>
                <div className='col-12 mt-5'>
                    {props.userData?
                    <div>
                        <h1>Write a Post</h1>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" onChange={(event)=>setTitle(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <Editor
                            init={{
                            height: 500,
                            menubar: false,
                            }} 
                            onEditorChange={contentOnChange}
                            value={content}/>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="publish"/>
                            <label className="form-check-label" htmlFor="publish" onClick={()=>setPublish(!publish)}>Publish</label>
                        </div>
                        <button className="btn btn-dark mt-2" onClick={submitPost} >Submit</button>
                    </div>:
                    <h1>Please Log in for Writing Post</h1>}
                </div>
            </div>
        </div>
    );
}

export default Post;