import moment from 'moment';
import {NavLink} from "react-router-dom";
import { useState,useEffect } from 'react';
import intro from '../assets/images/intro.jpg';
import parse from 'html-react-parser';
import '../assets/styles/Homepage.css';

const Homepage=(props)=>{

    const [postList,setPostList]=useState(null);

    // Fetch new post from Backend
    const fetchPostData =()=>fetch('https://lit-temple-22800.herokuapp.com/',{mode:'cors'})
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        setPostList(response)
    })
    .catch(function(err){
        console.log(err)
    })

    // update the fetch post method if route is homepage
    useEffect(()=>{
        fetchPostData()
    },[])

    return(
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='introduction-conatiner border-bottom row align-items-center'>
                    <div className='col-8'>
                        <h1>Web developer blog</h1>
                        <p>I am a self taught developer. Here's my blog</p>
                        <p>Share thinking and experience with you!</p>
                        <NavLink to='/login'><button>Get Started</button></NavLink>
                    </div>
                    <div className='col-4'>
                    <img src={intro} alt='coding' className='img-fluid rounded-start'></img>
                    </div>
                </div>
                <div className='col-12 post-body mt-3'>
                {/* display all Postlist and if the post is published. If unpublished, print empty */}
                {postList?postList.map((post,index)=>{
                    const path=`/post/${post._id}`
                    if(post.publish===true){
                        return (
                            <NavLink to={path} key={index} >
                                <div className='post-title-container'>
                                    <h2 className='post-title'>{post.title}</h2>
                                    <small>By {post.author} / {moment(post.timestamp).format('DD MMM YYYY')}</small>
                                </div>
                                <div className='post-content-container'>
                                    {parse(post.content)}
                                </div>
                            </NavLink>
                        )
                    }else{
                        return ''
                    }
                }):<p className='text-light'>Loading...</p>}
                </div>
            </div>
        </div>
    )
}

export default Homepage;