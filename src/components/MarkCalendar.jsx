import moment from "moment";
import React, { useState } from "react";

import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledToday,
  StyledDot,
} from "./StyledCalendarWrapper";

function MarkCalendar({
  readOnly,
  setFocusDate,
  setSelectedDate,
  selectedDates = [],
}) {
  const today = new Date();
  const [activeStartDate, setActiveStartDate] = useState();
  const attendDay = ["2023-12-03", "2023-12-13"]; // 출석한 날짜 예시

  const handleDateChange = (newDate) => {
    if (readOnly) {
      setFocusDate(newDate);
      return;
    }
    setSelectedDate((prev) => {
      const prevDateIdx = prev.findIndex((ddate) =>
        moment(ddate).isSame(moment(newDate))
      );
      const newArr = [...prev];
      if (prevDateIdx < 0) {
        return [...prev, newDate];
      } else {
        newArr.splice(prevDateIdx, 1);
        return newArr;
      }
    });
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setSelectedDate(today);
  };
  return (
    <StyledCalendarWrapper readOnly={readOnly}>
      <StyledCalendar
        value={null}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileClassName={({ activeStartDate, date, view }) => {
          console.log({ date, selectedDates });
          const sameDate = selectedDates.some((sdate) =>
            moment(sdate).isSame(moment(date))
          );
          if (sameDate) return "selectedDate";
        }}
        // // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        // activeStartDate={
        //   activeStartDate === null ? undefined : activeStartDate
        // }
        // onActiveStartDateChange={({ activeStartDate }) =>
        //   setActiveStartDate(activeStartDate)
        // }
        // // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        // tileContent={({ date, view }) => {
        //   let html = [];
        //   if (
        //     view === "month" &&
        //     date.getMonth() === today.getMonth() &&
        //     date.getDate() === today.getDate()
        //   ) {
        //     html.push(<StyledToday key={"today"}>3명</StyledToday>);
        //   }
        //   if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
        //     html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
        //   }
        //   return <>{html}</>;
        // }}
      />
    </StyledCalendarWrapper>
  );
}

export default MarkCalendar;
