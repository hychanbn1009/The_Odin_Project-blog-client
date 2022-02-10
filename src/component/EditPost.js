import { useState,useEffect } from 'react';
import moment from "moment";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

const EditPost=()=>{
    const[postList,setPostList]=useState(null);
    const[fetchNew,setFetchNew]=useState(false);

    const fetchPost=()=>{
        fetch('https://lit-temple-22800.herokuapp.com/edit')
        .then(function(response){
            return response.json()
        })
        .then(function(post){
            setPostList(post)

        })
        .catch(function(error){
            console.log(error)
        })
    }

    const navigate = useNavigate(); 

    const checkPost=(postId)=>{
        navigate(`/post/${postId}`)
    }

    const deletePost =(postId)=>{
        setFetchNew(true)
        axios({
            method:'DELETE',
            url:`https://lit-temple-22800.herokuapp.com/edit/${postId}`,
            withCredentials: true
        })
    }

    const updatePostPublish =(postId)=>{
        setFetchNew(true)
        axios({
            method:'PUT',
            url:`https://lit-temple-22800.herokuapp.com/edit/${postId}`,
            withCredentials: true
        })
    }

    useEffect(()=>{
        fetchPost()
        if(fetchNew){
            setTimeout(() => 
            fetchPost()
            , 1500);
            setFetchNew(false)
        }
    },[fetchNew])

    return(
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 post-body mt-3'>
                    <h2 className='post-body-title'>Manage Your Post</h2>
                {postList?postList.map((post)=>{
                    return (
                        <div>
                            <div className='post-title-container'>
                                <h2 className='card-title'>{post.title}</h2>
                                <small>By {post.author} / {moment(post.timestamp).format('DD MMM YYYY')}</small>
                            </div>
                            <div className='post-content-container'>
                                {parse(post.content)}
                                <div className="btn-group d-block" role="group" >
                                    <button id={post._id} type="button" className="btn btn-outline-info" onClick={(event)=>checkPost(event.target.id)}>Check</button>
                                    {post.publish?
                                    <button id={post._id} type="button" className="btn btn-outline-secondary" onClick={(event)=>updatePostPublish(event.target.id)}>Hide</button>
                                    :
                                    <button id={post._id} type="button" className="btn btn-outline-success" onClick={(event)=>updatePostPublish(event.target.id)}>Publish</button>}
                                    <button id={post._id} type="button" className="btn btn-outline-danger" onClick={(event)=>deletePost(event.target.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }):<p className='text-light'>Loading...</p>}
                </div>
            </div>
        </div>
    )
}

export default EditPost;