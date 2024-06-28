import React from "react";

import { auth } from "./../tools/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { UserEmailState } from "../store/atom";

function LoginPage() {
  const setUserToken = useSetRecoilState(UserEmailState);
  const [userData, setUserData] = useState(null);

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

  return (
    <div>
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
        <></>
      )}
    </div>
  );
}

export default LoginPage;

const LoginBtn = styled.button`
  margin-left: 30px;
`;

const Text = styled.div`
  margin-top: 20px;
`;
