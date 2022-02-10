/* eslint-disable no-console */
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import intro from '../assets/images/intro.jpg';

function Homepage() {
  const [postList, setPostList] = useState(null);

  const fetchPostData = () => fetch('http://localhost:3001/', { mode: 'cors' })
    .then((res) => res.json())
    .then((response) => {
      setPostList(response);
    })
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="introduction-conatiner border-bottom row align-items-center">
          <div className="col-8">
            <h1>Web developer blog</h1>
            <p>I am a self taught developer. Here&apos;s my blog</p>
            <p>Share thinking and experience with you!</p>
            <NavLink to="/login"><button type="button">Get Started</button></NavLink>
          </div>
          <div className="col-4">
            <img src={intro} alt="coding" className="img-fluid rounded-start" />
          </div>
        </div>
        <div className="col-12 post-body mt-3">
          {postList ? postList.map((post) => {
            const path = `/post/${post._id}`;
            if (post.publish === true) {
              return (
                <NavLink to={path}>
                  <div className="post-title-container">
                    <h2 className="post-title">{post.title}</h2>
                    <small>
                      By
                      {post.author}
                      {' '}
                      /
                      {moment(post.timestamp).format('DD MMM YYYY')}
                    </small>
                  </div>
                  <div className="post-content-container">
                    {parse(post.content)}
                  </div>
                </NavLink>
              );
            }
            return '';
          }) : <p className="text-light">Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
