import React from 'react'
import { Route, Routes, BrowserRouter, } from "react-router-dom";
import Recipes from "./pages/Recipes"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Landing from "./pages/Landing"
import Notes from "./pages/Notes"
import Update from "./pages/update"
import Info from "./pages/Info"
import "./style.css"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Recipes" element={<Recipes />} />
          <Route path="/update/:n_id" element={<Update />} />
          <Route path="/Info/:recipeID" element={<Info />} />
        </Routes>

      </BrowserRouter>
    </div >
  );
}

export default App;
