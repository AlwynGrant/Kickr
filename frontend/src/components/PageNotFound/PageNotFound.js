import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {

    return (
        <div className='lost-container'>
            <div className='lost-PNF'>Page Not Found</div>
            <h1 className='lost-header'>Oops. Something went wrong</h1>
            <h2 className='lost-sub'>Here's a link to the <NavLink className='lost-link'>home page</NavLink></h2>
        </div>
    );
}

export default PageNotFound;
