import { useEffect, useState } from "react";
import moment from "moment";
import Comment from "./Comment"
import parse from 'html-react-parser';

const PostDetail =()=>{

    const[postDetail,setPostDetail]=useState(null);
    const[commentDetail,setCommentDetail]=useState(null);
    const[fetchNew,setFetchNew]=useState(false);
    
    const url=`https://lit-temple-22800.herokuapp.com${window.location.pathname}`


    const fetchPost=(url)=>{
        fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            setPostDetail(response.post)
            setCommentDetail(response.comment)
        })
        .catch(function(error){
            console.log(error)
        })
    }


    useEffect(()=>{
        fetchPost(url)
        if(fetchNew){
            setTimeout(() => 
            fetchPost(url)
            , 1500);
            setFetchNew(false)
        }
    },[url,fetchNew])

    return(
        <div className='container'>
        <div className='row'>
            <div className='col-12 post-body mt-3'>
                {postDetail?
                <div>
                    <div className="post-title-container">
                        <h1>{postDetail.title}</h1>
                        <p>By: {postDetail.author} / {moment(postDetail.timestamp).format('MMM DD YYYY')}</p>
                    </div>
                    <div className="post-content-container">
                        {parse(postDetail.content)}
                    </div>
                <h2 className="comment-number">Comments: {commentDetail?commentDetail.length:0}</h2>
                <Comment postId={postDetail._id} setFetchNew={setFetchNew}/>
                {commentDetail?commentDetail.map((comment,index)=>{
                    return (
                    <div>
                        <div key={index} className='comment-title-container'>
                            <h3 className="col-9">{comment.author}</h3>
                            <hr></hr>
                            {comment.content}
                        </div>
                        <div className='comment-content-container'>
                            <small>Posted on: {moment(comment.timestamp).format('MMM DD YYYY')}</small>
                        </div>
                    </div>
                    )
                }):''}
                </div>
                :
                <h1>Loading...</h1>
                }
            </div>
        </div>
    </div>
    )
}

export default PostDetail;