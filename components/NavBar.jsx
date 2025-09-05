import React from "react";
import {Link} from 'react-router-dom';

export default function NavBar(){
    return (
        <nav className="navbar fixed top-15 left-[50%] translate-x-[-50%]">
            <ul className="flex justify-center gap-5">
                <li className="bg-purple-400 hover:bg-purple-600 rounded shadow-lg shadow-indigo-500/50 transition"><Link to="/" className="inline-block text-white text-lg pt-1 pb-1 pl-5 pr-5">iPhone</Link></li>
                <li className="bg-purple-400 hover:bg-purple-600 rounded shadow-lg shadow-indigo-500/50 transition"><Link to="/ipad" className="inline-block text-white text-lg pt-1 pb-1 pl-5 pr-5">iPad</Link></li>
                <li className="bg-purple-400 hover:bg-purple-600 rounded shadow-lg shadow-indigo-500/50 transition"><Link to="/airpod" className="inline-block text-white text-lg pt-1 pb-1 pl-5 pr-5">AirPods</Link></li>
                <li className="bg-purple-400 hover:bg-purple-600 rounded shadow-lg shadow-indigo-500/50 transition"><Link to="/airmax" className="inline-block text-white text-lg pt-1 pb-1 pl-5 pr-5">AirMax</Link></li>
                <li className="bg-purple-400 hover:bg-purple-600 rounded shadow-lg shadow-indigo-500/50 transition"><Link to="/macbook" className="inline-block text-white text-lg pt-1 pb-1 pl-5 pr-5">MacBook</Link></li>
            </ul>
        </nav>
    )
}