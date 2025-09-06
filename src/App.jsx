import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showroom from '../pages/Showroom'
import NavBar from '../components/NavBar'

function App() {

  return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Showroom product="iphone"/>} />
                <Route path="/ipad" element={<Showroom product="ipad"/>} />
                <Route path="/airpod" element={<Showroom product="airpod"/>} />
                <Route path="/airmax" element={<Showroom product="airmax"/>} />
                <Route path="/macbook" element={<Showroom product="macbook"/>} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
