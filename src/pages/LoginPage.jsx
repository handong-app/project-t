import React, { useEffect } from "react";
import googleLogo from "../../public/googleLogo.svg";

import { auth } from "./../tools/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useSetRecoilState } from "recoil";
import { UserEmailState } from "../store/atom";

function LoginPage() {
  const setUserToken = useSetRecoilState(UserEmailState);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        setUserToken(data.user.email);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log("user data : ", userData);

  return (
    <>
      <GlobalStyle />

      <LoginBtn onClick={handleGoogleLogin}>구글 로그인</LoginBtn>
      {userData ? (
        <>
          <Text> 환영합니다, {userData.displayName}님 </Text>
          //ToDo: 은주 : 너가 만든 페이지로 넘어가게 변경 (넘겨주면서 props같이)
          <Link to="/create">
            방 만들어보자 (은주가 작업한 페이지 메인에 올라오면 글로 옮길 예정)
          </Link>
        </>
      ) : (
        <Wrapper>
          <TextContainer>
            <MainText>Handong App</MainText>
            <Text>쉽게 팀원을 초대하고 빠르게 일정을 잡아보세요</Text>
            <LoginBtn onClick={handleGoogleLogin}>
              <img src={googleLogo}></img>구글로 시작하기
            </LoginBtn>
          </TextContainer>
        </Wrapper>
      )}
    </>
  );
}

export default LoginPage;

const GlobalStyle = createGlobalStyle`
  #root {
    margin: 0 !important;
    max-width: 100% !important;
  }
`;

const Wrapper = styled.div`
  border: 0.1px solid #ffffff;
  height: 100vh;
  width: 100vw;
  text-align: center;
  background: url("/wave.svg") no-repeat;
  background-position: bottom;
`;

const TextContainer = styled.div`
  margin-top: 15%;

  @media (max-width: 600px) {
    margin-top: 60%;
  }
`;

const LoginBtn = styled.button`
  margin-top: 50px;
  background-color: #faf4fc;

  img {
    height: 25px;
    vertical-align: middle;
    margin-right: 6px;
  }

  &:hover {
    border-color: #9c27b0;
  }
`;
const MainText = styled.div`
  font-size: 40px;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: #34183e;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
