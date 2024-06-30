import { useEffect, useState } from "react";
import "./App.css";
import { auth, database, provider } from "./tools/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <div className="App">
      <h1>Hello Frontend!</h1>
      <TestComponent />
      <Link to="/test">To Test Page</Link>
      <Link to="/login">To Login Page</Link>
    </div>
  );
}

export default App;
