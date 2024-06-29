import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function ChooseDate({ setModalOpen }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // setModalOpen(false);
  //   navigate("/create", { state: { startDate, endDate }, lctn: { location } }); // 날짜 데이터 넘겨줌
  //   // console.log("startdate: " + startDate.toLocaleDateString);
  //   // console.log("endDate" + endDate.toLocaleDateString);
  // };

  const formatDate = (date) => {
    return date ? date.toISOString().substring(0, 10) : "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    navigate("/create", {
      state: { startDate: startDate, endDate: endDate },
    }); // 날짜 데이터 넘겨줌
  };
  return (
    <form onSubmit={handleSubmit}>
      <ModalBackground>
        <Modal>
          <ModalContents>
            <ModalHeader>
              <div className="modal-cancel">
                <CancelButton onClick={closeModal}>
                  <ClearRoundedIcon />
                </CancelButton>
              </div>
              <div className="modal-title">기간 설정</div>
              <ModalPostInfos>
                <DateWrapper>
                  <DatePickerContainer>
                    <div className="choose-dates">
                      <div className="date-title">시작 날짜</div>
                      <DatePickerWrapper>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(formatDate(date))}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="시작 날짜"
                          className="datepicker-input"
                          required
                        />
                        {startDate && (
                          <SelectedDateText>{startDate}</SelectedDateText>
                        )}
                      </DatePickerWrapper>
                    </div>
                  </DatePickerContainer>
                  <DatePickerContainer>
                    <div className="choose-dates">
                      <div className="date-title">끝 날짜</div>
                      <DatePickerWrapper>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(formatDate(date))}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="끝 날짜"
                          className="datepicker-input"
                          required
                        />
                        {endDate && (
                          <SelectedDateText>{endDate}</SelectedDateText>
                        )}
                      </DatePickerWrapper>
                    </div>
                  </DatePickerContainer>
                </DateWrapper>
              </ModalPostInfos>
            </ModalHeader>
            <ModalButtons>
              <SaveButton type="submit">저장하기</SaveButton>
            </ModalButtons>
          </ModalContents>
        </Modal>
      </ModalBackground>
    </form>
  );
}

export default ChooseDate;

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
  justify-content: start;
  box-shadow: 0 0 10px 1px #0000002a;
  z-index: 2000;
  position: fixed;
  padding-top: 20px;
  align-items: center;
  background-color: white;
  width: 50%;
  height: 500px;
  border-radius: 25px;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 98%;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .modal-cancel {
    display: flex;
    justify-content: end;
  }

  .modal-title {
    display: flex;
    color: black;
    font-weight: bolder;
    border-bottom: 2px solid ${(props) => props.theme.colors.purple600};
    justify-content: center;
    font-size: 20px;
    margin-top: -10px;
  }
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.purple600};
  font-family: "Pretendard-SemiBold", Helvetica;
  width: 30px;
  height: 30px;
  margin-top: -5px;
  cursor: pointer;

  > svg {
    width: 35px;
    height: 35px;
  }
`;

const ModalPostInfos = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  .choose-dates {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 100%;
  }

  .date-title {
    display: flex;
    justify-content: center;
    font-weight: bold;
    height: 15px;
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;

  .datepicker-input {
    display: flex;
    width: 85%;
    margin: 10px 0;
    padding: 8px;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.colors.purple600};
    padding-left: 10px;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SelectedDateText = styled.div`
  display: flex;
  width: 200px;
  position: absolute;
  align-items: center;
  margin-top: 50px;
  /* width: 200px;
  top: 100 px;
  left: 10px;  */
  font-size: 35px;
  color: black;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  position: absolute;
  bottom: 10px;
  width: 100%;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 10px 60px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.purple500};
  border: 2px solid ${(props) => props.theme.colors.purple500};
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard-SemiBold", Helvetica;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.purple700};
    border: 2px solid ${(props) => props.theme.colors.purple700};
  }
`;
