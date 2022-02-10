import input from '../assets/images/input.jpg'
import '../assets/styles/Signin.css'

const Login=(props)=> {

    return (
        <div>
            {
                props.userData?
                <div>Welcome {props.userData.username}</div>
                :
                <div className='container signin-container'>
                    <div className='row justify-content-center'>
                    <div className="card border-0">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-4">
                                <img src={input} className="align-middle img-fluid rounded-start" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h2>Sign In</h2>
                                        <div className="form-group mt-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username"  onChange={(event)=>props.setLoginUsername(event.target.value)}/>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" onChange={(event)=>props.setLoginPassword(event.target.value)}/>
                                        </div>
                                        <small className="text-white">{props.errormessage?props.errormessage:''}</small>
                                    <button className="btn btn-dark mt-2" onClick={props.signin}>Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            }
        </div>
  );
}

export default Login;
