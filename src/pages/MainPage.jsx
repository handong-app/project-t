import React, { useState } from "react";
import styled from "styled-components";
import ChooseDate from "../components/ChooseDate";

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <BtnContainer>
      <CodeSearch>코드 입력</CodeSearch>
      <CodeSearch onClick={() => showModal()}>코드 생성</CodeSearch>
      {modalOpen && <ChooseDate setModalOpen={setModalOpen} />}
    </BtnContainer>
  );
}

export default MainPage;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: space-evenly;
  /* border: 2px solid red; */
`;
const CodeSearch = styled.div`
  display: flex;
  padding: 40px 30px;
  /* background-color: #ba68c8; // <<<<<<<- 나중에 변경 */
  border: 2px solid #7b1fa249;
  border-radius: 15px;
  color: #7b1fa2de;
  font-weight: bolder;
  background-color: white;
  width: 200px;
  margin-right: 100px;
  margin-left: 100px;
  justify-content: space-evenly;
  align-items: space-evenly;
  cursor: pointer;
  transition: 0.15s;
  &:hover {
    transform: scale(1.1);
    background-color: #8e24aa; // <<<<<<<- 나중에 변경
    color: white;
  }
`;
