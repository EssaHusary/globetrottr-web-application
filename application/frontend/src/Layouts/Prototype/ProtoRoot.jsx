import React from "react";

import { Route, Routes, NavLink, Link } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Proto from "./Proto";

function ProtoRoot() {
  return (
    <div className="root">
      <header>
        <nav>
          <h1>CSC648/848 S01 Team 03</h1>
          <NavLink to="">Home</NavLink>
          <NavLink to="about/">About</NavLink>
          <NavLink to="test/">Vertical Prototype!</NavLink>
          <Link to="/">Globetrottr</Link>
        </nav>
      </header>

      <div className="content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="about/*" element={<About />} />
          <Route path="test/*" element={<Proto />} />
        </Routes>
      </div>

      <footer>
        <p>©2023 CSC648/848 S01 Team 03</p>
      </footer>
    </div>
  );
}

export default ProtoRoot;
