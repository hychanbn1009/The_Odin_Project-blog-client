import {Container,Navbar,Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";

const Header=(props)=> {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
          <NavLink to="/" className="navbar-brand">Blog</NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                {props.userData? (<NavLink to="/post" className="nav-link ">Write Post</NavLink>):''}
                {props.userData?'':(<NavLink to="/login" className="nav-link ">Log In</NavLink>)}
                {props.userData?(<NavLink to="/edit" className="nav-link ">Edit</NavLink>):''}
                {props.userData?(<NavLink to="/" className="nav-link" onClick={()=>{props.setUserData(null)}}>Log Out</NavLink>):''}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
