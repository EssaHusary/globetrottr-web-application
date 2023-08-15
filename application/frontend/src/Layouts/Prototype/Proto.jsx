import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import ProtoSearch from "./ProtoSearch";
import ProtoView from "./ProtoView";

function Proto() {
  return (
    <div className="proto">
      <header>
        <nav>
          <NavLink to="view">View</NavLink>
          <NavLink to="search">Search</NavLink>
        </nav>
      </header>

      <div className="content">
        <Routes>
          <Route path="view" element={<ProtoView />}></Route>
          <Route path="search" element={<ProtoSearch />}></Route>
          <Route path="*" element={<Navigate to="view" />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Proto;
