import React from "react";
import Logo from "../assets/logo.png";
import './toolbar.css'

const toolbar = (props) => (
    <header className='toolbar'>
        <div className='logo'>
            <img src={Logo} alt="My logo"></img>
        </div>
    </header>
);

export default toolbar;
