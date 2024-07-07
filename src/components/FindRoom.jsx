import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { firestore } from "../tools/firebase";
import { collection, documentId, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { query } from "firebase/database";
// import { useRecoilValue } from "recoil";
// import { UserEmailState } from "../store/atom";
function FindRoom({ setFindRoomModalOpen }) {
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setFindRoomModalOpen(false);
  };

  const handleConfirm = async (e) => {
    //입력받은 초대코드가 존재하는지 아닌지 판별해서 존재할때만 해당 페이지로 이동
    e.preventDefault();

    try {
      const roomRef = collection(firestore, "room");
      const q = query(roomRef, where("__name__", "==", documentId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("입력하신 코드가 존재하지 않습니다!");
      } else {
        setError("");
        navigate(`/m/${documentId}`);
        closeModal(); // 페이지 연결하면 이 부분은 삭제해도 됨
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      setError("오류가 발생했습니다. 다시 입력해주세요");
    }
  };

  useEffect(() => {
    console.log(documentId); // 콘솔 확인용
  }, [documentId]);

  return (
    <ModalBackground>
      <form>
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
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              // onChange={(e) => setInputValue(e.target.value)}
            />
            <div>{error && <NoRcodeError>{error}</NoRcodeError>}</div>
          </ModalBody>
          <ModalFooter>
            <ConfirmButton type="submit" onClick={handleConfirm}>
              확인
            </ConfirmButton>
          </ModalFooter>
        </Modal>
      </form>
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
  color: ${(props) => props.theme.colors.purple600};
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
const NoRcodeError = styled.span`
  color: red;
  font-size: 14px;
`;
