import React, { useEffect } from "react";

import { auth } from "./../tools/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";

function LoginPage() {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <LoginBtn onClick={handleGoogleLogin}>구글 로그인</LoginBtn>
      <Text>
        {userData ? "환영합니다, " + userData.displayName + "님" : " "}
      </Text>
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
