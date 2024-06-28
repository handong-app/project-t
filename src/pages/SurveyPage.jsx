import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import MarkCalendar from "../components/MarkCalendar";
import styled from "styled-components";

const sampleData = [
  {
    id: "apple@handong.ac.kr",
    date: ["2024-06-04", "2024-06-05", "2024-06-09"],
  },
  {
    id: "22200750@handong.ac.kr",
    date: ["2024-06-04", "2024-06-06", "2024-06-10"],
  },
];

function SurveyPage() {
  const [editMode, setEditMode] = useState(false);
  const [mySelectedDate, setMySelectedDate] = useState([]);

  const reservedDates = {};
  sampleData.map((markUserData) =>
    markUserData.date.map((date) => {
      reservedDates[date] = [...(reservedDates[date] || []), markUserData.id];
    })
  );

  const toggleMode = () => {
    setEditMode((prev) => !prev);
  };

  console.log(reservedDates);

  return (
    <div>
      <h1>MarkingPage</h1>
      {editMode ? (
        <MarkCalendar
          readOnly={false}
          selectedDates={mySelectedDate}
          setSelectedDate={setMySelectedDate}
        />
      ) : (
        <MarkCalendar
          readOnly={true}
          selectedDates={Object.keys(reservedDates)}
        />
      )}

      <ButtonContainer>
        <Button onClick={toggleMode}>{editMode ? "저장" : "수정"}하기</Button>
      </ButtonContainer>
    </div>
  );
}

const ButtonContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.readOnly ? "grey" : props.theme.colors.purple400};
  font-weight: bold;
  color: white;
`;

export default SurveyPage;
