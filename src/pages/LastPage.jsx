/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../tools/firebase";
import { useParams } from "react-router-dom";

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  > button {
    background-color: #39005c;
    color: white;
    transition: all;
    transition-duration: 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

function LastPage({ roomInfo, getRoomInfo }) {
  // const navigate = useNavigate();
  const { surveyId } = useParams();
  const firebaseDoc = doc(firestore, "room", surveyId);
  const location = useLocation();

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ResultWrapper>
      <h1>결정 날짜 : {roomInfo?.finalDate} </h1>
      <BtnContainer>
        <button
          onClick={async () => {
            await updateDoc(firebaseDoc, {
              status: "vote",
            });
            getRoomInfo();
          }}
        >
          재투표하기
        </button>
        <button
          onClick={async () => {
            await updateDoc(firebaseDoc, {
              status: "mark",
            });
            getRoomInfo();
          }}
        >
          날짜 수정하기
        </button>
      </BtnContainer>
      {/* <button onClick={() => handleCopyClipBoard(`${location.pathname}`)}>
        링크 복사하기
      </button> */}
    </ResultWrapper>
  );
}

export default LastPage;
