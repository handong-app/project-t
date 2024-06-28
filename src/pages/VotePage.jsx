import React, { useState } from "react";
import styled from "styled-components";

function VotePage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleRadioChange = (index) => {
    setSelectedDate(index);
  };

  const dates = [
    "2024년 6월 24일 (일) ~ 25일 (월)",
    "2024년 6월 26일 (화) ~ 27일 (수)",
    "2024년 6월 28일 (목) ~ 29일 (금)",
  ];

  return (
    <PageContainer>
      <Container>
        <Title>가장 선호하는 날짜를 선택해주세요</Title>
        {dates.map((date, index) => (
          <VoteContainer key={index} onClick={() => handleRadioChange(index)}>
            <SelectBtn checked={selectedDate === index} />
            <Date checked={selectedDate === index}>{date}</Date>
          </VoteContainer>
        ))}
        <CompleteBtn>투표 완료</CompleteBtn>
      </Container>
    </PageContainer>
  );
}

export default VotePage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #39005c;
  margin-bottom: 30px;
`;

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #39005c;
  margin-bottom: 10px;
  cursor: pointer;
`;

const SelectBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 20px;
  background-color: ${({ checked }) => (checked ? "#7B1FA2" : "#dddddd")};
  cursor: pointer;
  &:hover {
    background-color: #691b8a90;
  }
`;

const Date = styled.div`
  font-size: 15px;
  color: ${({ checked }) => (checked ? "#7B1FA2" : "#39005c")};
`;

const CompleteBtn = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 37px;
  border-radius: 35px;
  border: 1px #7b1fa2 solid;

  color: #7b1fa2;
  font-size: 13px;

  &:hover {
    color: white;
    background-color: #7b1fa2;
  }
`;
