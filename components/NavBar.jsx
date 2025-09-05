import React from "react";
import {Link} from 'react-router-dom';

export default function NavBar(){
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">iPhone</Link></li>
                <li><Link to="/ipad">iPad</Link></li>
                <li><Link to="/airpod">AirPods</Link></li>
                <li><Link to="/airmax">AirMax</Link></li>
                <li><Link to="/macbook">MacBook</Link></li>
            </ul>
        </nav>
    )
}