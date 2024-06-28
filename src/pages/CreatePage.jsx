import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { firestore } from "../tools/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { UserEmailState } from "../store/atom";

//ToDo : 은주 : props 넘겨받고 콘솔로 확인
function CreatePage() {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [members, setMembers] = useState([]);
  const [rcode, setRcode] = useState("");
  const [error, setError] = useState("");
  const [ecode, setEcode] = useState([]);
  const [success, setSuccess] = useState(false);
  const userEmail = useRecoilValue(UserEmailState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(firestore, "room"));
      const fetchedEcode = [];
      query.forEach((room) => {
        console.log(room.id, room.data());
        const rdata = room.data();
        fetchedEcode.push({ code: rdata.r_code });
        setEcode(fetchedEcode);
      });
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDuplicate = ecode.some((item) => item.code === rcode);
    console.log("isDuplicate" + isDuplicate);
    if (isDuplicate) {
      setError("중복되는 코드입니다.");
    } else {
      setError("");
      try {
        const docRef = doc(firestore, "room", rcode);
        setDoc(docRef, {
          m_id: userEmail, // 방 생성자 아이디 -> 로그인 이후 저장된 데이터
          // r_code: rcode,
          r_intro: intro,
          r_memberId: members,
          r_name: name,
          r_fDate: "2024.04.12", //ToDo : 은주 : props 내용 넣어주기
          r_sDate: "2024.05.12", //ToDo : 은주 : props 내용 넣어주기
        });
        setSuccess(true);
        setName("");
        setIntro("");
        setRcode("");
        setMembers("");
        setError("");
        setTimeout(() => {
          setSuccess(false);
          navigate("/test"); //TODO: 생성 후 다음페이지로 경로 변경해줘야함.
        }, 1000);
      } catch (error) {
        console.error("생성 실패 오류 : ", error);
      }
    }
  };

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
          name="rcode"
          value={rcode}
          onChange={(e) => setRcode(e.target.value)}
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
