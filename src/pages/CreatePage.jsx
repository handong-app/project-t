import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { firestore } from "../tools/firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { UserEmailState } from "../store/atom";

function CreatePage() {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [members, setMembers] = useState([]);
  const [docID, setDocID] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const userEmail = useRecoilValue(UserEmailState);
  const navigate = useNavigate();
  /// props 대신에...
  const location = useLocation();
  const { startDate, endDate } = location.state || {}; // 받아온 날짜 데이터 여기에 넣어줌
  const [loading, setLoading] = useState(true);
  console.log("startdate:!!!" + startDate);
  console.log("endDate:!!!" + endDate);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const docRef = doc(firestore, "room", docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setError("중복되는 코드입니다.");
      } else {
        await setDoc(docRef, {
          m_id: userEmail, // 방 생성자 아이디 -> 로그인 이후 저장된 데이터
          // r_code: rcode, // <- r_code 대신 documentId사용
          r_intro: intro,
          r_memberId: members,
          r_name: name,
          r_sDate: startDate, // yyyy-mm-dd 형식
          r_fDate: endDate, // yyyy-mm-dd 형식
          status: "mark",
        });
        setSuccess(true);
        setName("");
        setIntro("");
        // setRcode("");
        setMembers("");
        setError("");
        setTimeout(() => {
          setSuccess(false);
          navigate("/m/" + docID); //TODO: 생성 후 다음페이지로 경로 변경해줘야함.
        }, 1000);
      }
    } catch (error) {
      console.error("생성 실패 오류 : ", error);
      setError("방 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    ); // 로딩 상태 표시
  }
  return (
    <div>
      <MainText>방 만들기</MainText>
      <form onSubmit={handleSubmit}>
        <Label>방 이름</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <Label>방 설명</Label>
        <Input
          type="text"
          name="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />{" "}
        <br />
        <Label>방 코드</Label>
        <Input
          type="text"
          name="docID"
          value={docID}
          onChange={(e) => setDocID(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <br />
        <Label>초대 멤버</Label>
        <Input
          type="text"
          name="member"
          placeholder="이메일을 입력해주세요."
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />{" "}
        <br />
        <SubmitBT type="submit" />
      </form>
      {success && <SuccessMessage>방 생성이 완료되었습니다.</SuccessMessage>}
    </div>
  );
}

export default CreatePage;

const MainText = styled.div`
  color: ${(props) => props.theme.colors.purple700};
  font-size: 30px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.purple700};
  font-size: 15px;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 14px;
`;

const SubmitBT = styled.input`
  border: 1px solid ${(props) => props.theme.colors.purple400};
  border-radius: 20px;
  font-size: 20px;
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.purple400};
  color: white;
  margin-top: 50px;
  margin-left: auto;
  display: block;
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;
