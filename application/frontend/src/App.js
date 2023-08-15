import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ProtoRoot from "./Layouts/Prototype/ProtoRoot";
import Canvas from "./Layouts/Canvas";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/proto/*" element={<ProtoRoot />} />
          <Route path="/*" element={<Canvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
