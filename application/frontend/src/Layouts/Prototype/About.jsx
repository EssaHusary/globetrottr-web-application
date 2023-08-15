import React from "react";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AboutKevin from "../../Pages/About/AboutKevin";
import AboutJay from "../../Pages/About/AboutJay";
import AboutEssa from "../../Pages/About/AboutEssa";
import AboutJustin from "../../Pages/About/AboutJustin";
import AboutDevin from "../../Pages/About/AboutDevin";
import AboutBrandon from "../../Pages/About/AboutBrandon";
import Placeholder from "../../Components/Placeholder";

function About() {
  return (
    <div className="about">
      <header>
        <nav>
          <NavLink to="jay">Jay</NavLink>
          <NavLink to="brandon">Brandon</NavLink>
          <NavLink to="devin">Devin</NavLink>
          <NavLink to="essa">Essa</NavLink>
          <NavLink to="justin">Justin</NavLink>
          <NavLink to="kevin">Kevin</NavLink>
        </nav>
      </header>

      <div className="content">
        <Routes>
          <Route path="*" element={<Placeholder />} />
          <Route path="jay" element={<AboutJay />} />
          <Route path="kevin" element={<AboutKevin />} />
          <Route path="essa" element={<AboutEssa />} />
          <Route path="justin" element={<AboutJustin />} />
          <Route path="brandon" element={<AboutBrandon />} />
          <Route path="devin" element={<AboutDevin />} />
        </Routes>
      </div>
    </div>
  );
}

export default About;
