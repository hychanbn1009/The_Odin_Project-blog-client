import Header from './Header';
import Post from './Post';
import Homepage from './Homepage';
import PostDetail from './PostDetail';
import Error from './Error';
import { Route, Routes } from "react-router";
import Login from './Signin';
import { useState } from 'react';
import axios from 'axios'
import {Navigate} from 'react-router-dom';
import EditPost from './EditPost';

const Main=()=>{

    const [loginUsername,setLoginUsername]=useState('');
    const [loginPassword,setLoginPassword]=useState('');
    const [userData,setUserData]=useState(null);
    const [route,setRoute]=useState(null);
    const [errormessage,setErrormessage]=useState(null);

    const signin =()=>{
        axios({
            method:'POST',
            data:{
                username: loginUsername,
                password: loginPassword,
            },
            url:'https://lit-temple-22800.herokuapp.com/login',
            withCredentials: true
        })
        .then((res)=>{
            setErrormessage(null)
            setUserData(res.data)
        })
        .catch((error)=>{
            setErrormessage(error.response.data)
        })
    }

    return(
        <div className="main-wrapper">
            <div className='header'>
                <Header
                userData={userData}
                setUserData={setUserData}
                />
            </div>
            <main className='content'>
                <Routes>
                    <Route path='/' element={<Homepage 
                    userData={userData}
                    />} />
                    <Route path='/post' element={userData?<Post
                    userData={userData}
                    setRoute={setRoute}
                    route={route}
                    />:<Error/>} />
                    <Route path='/login' element={userData?
                    <Navigate to='/' /> 
                    :<Login 
                    loginUsername={loginUsername} 
                    loginPassword={loginPassword} 
                    userData={userData} 
                    setLoginUsername={setLoginUsername} 
                    setLoginPassword={setLoginPassword}
                    setUserData={setUserData}
                    signin={signin}
                    errormessage={errormessage}
                    />} />
                    <Route path='/post/:id' element={<PostDetail/>}/>
                    <Route path='/edit' element={userData?<EditPost/>:<Error/>}/>
                    <Route path='*' element={<Error/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default Main;