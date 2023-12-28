import React from "react";
import HomePage from "./components/HomePage";
import Signup from "./components/signup";

import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (<>
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  </>
  );
}

export default App;
