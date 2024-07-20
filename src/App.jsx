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
import MainPage from "./pages/MainPage";
import styled from "styled-components";
function App() {
  return (

    <div className="App">
      <h1>Hello Frontend!</h1>
      <TestComponent />
      <Link to="/test">To Test Page</Link>
      <Link to="/login">To Login Page</Link>
      <Link to="/vote">To Vote Page</Link>
    </div>

    <AppContainer className="App">
      <LogoutBtn>
        <h1 className="title">Hello Frontend!</h1>
        <button className="logout-button" onClick={() => signOut(auth)}>
          로그아웃
        </button>
      </LogoutBtn>

      <MainPage />
    </AppContainer>

  );
}

export default App;
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogoutBtn = styled.div`
  display: flex;
  border-bottom: 2px solid ${(props) => props.theme.colors.purple700};
  justify-content: space-between;
  margin-bottom: 100px;
  margin-top: 0px;

  .title {
    margin: 0;
  }
  .logout-button {
    display: flex;
    align-self: flex-end;
    margin-bottom: 10px;
    height: 40px;
  }
`;
