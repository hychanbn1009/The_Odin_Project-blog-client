import { useEffect, useState } from "react";
import moment from "moment";
import Comment from "./Comment"
import parse from 'html-react-parser';
import axios from "axios";

const PostDetail =()=>{

    const[postDetail,setPostDetail]=useState(null);
    const[commentDetail,setCommentDetail]=useState(null);
    const [author,setAuthor]=useState('');
    const [content,setContent]=useState('');
    const[fetchNew,setFetchNew]=useState(false);
    const[selectedId,setSelectedId]=useState('')
    
    const url=`https://lit-temple-22800.herokuapp.com${window.location.pathname}`


    const fetchPost=(url)=>{
        fetch(url,{mode:'cors'})
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

    const deleteComment=(commentId)=>{
        setFetchNew(true)
        axios({
            method:'DELETE',
            data:{
                commentId: commentId,
            },
            url:url,
            withCredentials: false
        })
    }

    const editComment=(commentId)=>{
        setAuthor(commentDetail.filter(comment=>comment._id===commentId).map(comment=>comment.author)[0])
        setContent(commentDetail.filter(comment=>comment._id===commentId).map(comment=>comment.content)[0])
        setSelectedId(commentId)
    }

    const updateComment=(commentId)=>{
        setFetchNew(true)
        axios({
            method:'PUT',
            data:{
                commentId: commentId,
                author: author,
                content: content,
            },
            url:url,
            withCredentials: false
        })
        setSelectedId('')
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
                {commentDetail?commentDetail.map((comment)=>{
                    return (
                    <div>
                        {comment._id===selectedId?
                        <div className='comment-title-container'>
                            <input type="text" className="form-control" id="author" value={author} placeholder="Author" onChange={(event)=>setAuthor(event.target.value)}/>
                            <hr></hr>
                            <textarea type="text" rows="3" className="form-control" id="content" value={content} placeholder="Content" onChange={(event)=>setContent(event.target.value)}/>
                        </div>
                        :
                        <div className='comment-title-container'>
                            <h3 className="col-9">{comment.author}</h3>
                            <hr></hr>
                            {comment.content}
                        </div>}
                        <div className='comment-content-container'>
                            <small>Posted on: {moment(comment.timestamp).format('MMM DD YYYY')}</small>
                            <div className="btn-group d-block pb-2 pt-2" role="group" >
                                {comment._id===selectedId?
                                <button id={comment._id} className="btn btn-sm btn-primary" onClick={(event)=>updateComment(event.target.id)}>Submit</button>
                                :
                                <button id={comment._id} type="button" className="btn btn-sm btn-success" onClick={(event)=>editComment(event.target.id)}>Edit</button>}
                                <button id={comment._id} type="button" className="btn btn-sm btn-danger" onClick={(event)=>deleteComment(event.target.id)}>Delete</button>
                            </div>
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