import moment from "moment";
import React from "react";
import Calendar from "react-calendar";

function SurveyPage() {
  return (
    <div>
      <h1>SurveyPage</h1>
      <Calendar
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month"
        maxDetail="month"
        navigationLabel={null}
        showNeighboringMonth={false}
      />
    </div>
  );
}

export default SurveyPage;
