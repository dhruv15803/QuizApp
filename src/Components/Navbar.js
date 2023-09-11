import React from 'react';
import './ComponentCss/NavbarCss.css';
export default function Navbar(props) {
    
  return (
    <>
    <nav id="navbar">
        <div id="navLeft" onClick={()=>window.location='/'}>
            Quizella
        </div>
        {/* <ul>
            <div><li><a href="/Sports">Sports</a></li></div>
            <div><li><a href="/Entertainment: Film">Films</a></li></div>
            <div><li><a href="/Entertainment: Music">Music</a></li></div>
            <div><li><a href="/Science & Nature">Science & Nature</a></li></div>
        </ul> */}
        {props.loggedIn && <div id="navRight">
            <i className="fa-regular fa-user" style={{color:'#ffffff'}}></i>
            <span>{props.userInfo.firstName}</span>
            <span>{props.userInfo.lastName}</span>
        </div>}
    </nav>
    </>
  )
}
