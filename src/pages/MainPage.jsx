import React, { useState } from "react";
import styled from "styled-components";
import ChooseDate from "../components/ChooseDate";
import FindRoom from "../components/FindRoom";

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const [findRoomModalOpen, setFindRoomModalOpen] = useState(false);
  const showFindRoomModal = () => {
    setFindRoomModalOpen(true);
  };
  return (
    <BtnContainer>
      <MainBtn onClick={() => showFindRoomModal()}>코드 입력</MainBtn>
      {findRoomModalOpen && (
        <FindRoom setFindRoomModalOpen={setFindRoomModalOpen} />
      )}
      <MainBtn onClick={() => showModal()}>코드 생성</MainBtn>
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
const MainBtn = styled.div`
  display: flex;
  padding: 40px 30px;
  border: 2px solid ${(props) => props.theme.colors.purple700};
  border-radius: 15px;
  color: ${(props) => props.theme.colors.purple600};
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
    background-color: ${(props) => props.theme.colors.purple700};
    color: white;
  }
`;
