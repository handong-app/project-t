import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import MarkCalendar from "../components/MarkCalendar";

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
  const reservedDates = {};
  sampleData.map((markUserData) =>
    markUserData.date.map((date) => {
      reservedDates[date] = [...(reservedDates[date] || []), markUserData.id];
    })
  );
  console.log(reservedDates);

  return (
    <div>
      <h1>MarkingPage</h1>
      <MarkCalendar
        readOnly={true}
        selectedDates={Object.keys(reservedDates)}
      />
    </div>
  );
}

export default SurveyPage;
