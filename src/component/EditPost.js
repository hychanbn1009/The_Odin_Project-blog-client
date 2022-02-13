import { useState,useEffect } from 'react';
import moment from "moment";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

const EditPost=()=>{
    const[postList,setPostList]=useState(null);
    const[fetchNew,setFetchNew]=useState(false);

    // Fetch new post from Backend
    const fetchPost=()=>{
        fetch('https://lit-temple-22800.herokuapp.com/edit',{
            method:"get",
            headers:{"Content-Type":"application/json"}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(post){
            setPostList(post) // Store the list into Postlist

        })
        .catch(function(error){
            console.log(error) // If error, print the error
        })
    }
 
    const navigate = useNavigate();  // for redirect the route

    const checkPost=(postId)=>{
        navigate(`/post/${postId}`)
    }

    // Handle Post delete method
    const deletePost =(postId)=>{
        setFetchNew(true) // If the post is deleted, update the post list
        axios({
            method:'DELETE',
            url:`https://lit-temple-22800.herokuapp.com/edit/${postId}`,
            withCredentials: false
        })
    }

    // Handle Post update method
    const updatePostPublish =(postId)=>{
        setFetchNew(true) // If the post is udpated, update the post list
        axios({
            method:'PUT',
            url:`https://lit-temple-22800.herokuapp.com/edit/${postId}`,
            withCredentials: false
        })
    }

    // Check if the FetchNew is changed or not
    // If fetchNew is true, update the Postlist
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