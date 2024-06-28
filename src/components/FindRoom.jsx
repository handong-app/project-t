import React, { useState } from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function FindRoom({ setFindRoomModalOpen }) {
  const [inputValue, setInputValue] = useState(""); // 방 코드 저장할 부분

  const closeModal = () => {
    setFindRoomModalOpen(false);
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <CancelButton onClick={closeModal}>
            <ClearRoundedIcon />
          </CancelButton>
        </ModalHeader>
        <ModalBody>
          <div>초대코드를 입력하세요!</div>
          <InputField
            type="text"
            placeholder="코드 입력..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <ConfirmButton onClick={closeModal}>확인</ConfirmButton>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );
}

export default FindRoom;

const ModalBackground = styled.div`
  z-index: 1500;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e24aa;
  font-family: "Pretendard-SemiBold", Helvetica;
  width: 30px;
  height: 30px;
  cursor: pointer;

  > svg {
    width: 25px;
    height: 25px;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;
  > div {
    font-weight: bold;
  }
`;

const InputField = styled.input`
  width: 80%;
  padding: 10px;
  margin: 20px 0;
  border: 2px solid ${(props) => props.theme.colors.purple600};
  border-radius: 4px;
  font-size: 16px;
  text-align: left;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.purple500};
  color: white;
  border: none;
  font-size: 16px;
  transition: 0.15s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.purple700};
  }
`;
