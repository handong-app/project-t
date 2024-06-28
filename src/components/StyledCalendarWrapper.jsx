import Calendar from "react-calendar";
import styled, { css } from "styled-components";
// import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
  max-width: 450px;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    max-width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;

    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-weight: 800;
    font-size: 1rem;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  /* 상단 navigation 스타일 */
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 1 !important;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  /* 기존 호버 효과 -> 이후 직접 만들 예정. */
  /* .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  } */

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  // 대신 안에만 나오게 변경
  .react-calendar abbr {
    display: flex;
    /* width: 40px; */
    /* height: 40px; */
    padding: 8px;
    /* background-color: yellow; // 테스트용 배경 */
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  // 호버 효과 = readonly false 일때만 적용
  /* .react-calendar__tile:enabled:focus abbr  */
  .react-calendar__tile:not(.selectedDate):hover abbr {
    ${(props) =>
      !props.readOnly &&
      css`
        color: black;
        background-color: #e6e6e6;
      `};
  }

  .react-calendar__tile.selectedDate abbr {
    background-color: ${(props) =>
      props.readOnly ? "grey" : props.theme.colors.purple500};
    color: white;
  }
`;

export const StyledCalendarWrapper1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 1 !important;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    color: black;
    &:enabled {
    }
    /*
    &:hover {
      background-color: #e6e6e6;
    } */
    /* abbr {
      color: ${(props) => props.theme.primary_2};
    } */
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    /* border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0; */
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    /* background-color: ${(props) => props.theme.primary_2}; */
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    /* padding: 12px; */
    /* position: relative; */
    /* width: 21px; */
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    /* flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1}; */
  }

  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__days__day {
    /* background-color: yellow; // 임시 색상 지정 */
    width: 10px;
    box-sizing: border-box;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active,
  .selectedDate,
  .selectedDate.react-calendar__tile:enabled:focus {
  }

  /* Focus style 취소 */
  .react-calendar__tile:enabled:focus {
    background-color: white;
    color: black;
  }

  // 대신 안에만 나오게 변경
  .react-calendar__tile abbr {
    display: flex;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  .react-calendar__tile.selectedDate abbr {
    background-color: ${(props) =>
      props.readOnly ? "grey" : props.theme.colors.purple500};
  }

  // Read Only Mode
  ${(props) =>
    props.readOnly &&
    css`
      // Read only 시 hover 효과 취소
      .react-calendar__tile,
      .react-calendar__tile:enabled:hover:not(.selectedDate),
      .react-calendar__tile:enabled:focus {
        background-color: white !important;
      }

      .react-calendar__tile.selectedDate abbr {
        background-color: #ccc;
      }
    `}
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: ${(props) => props.theme.primary_3};
  color: ${(props) => props.theme.yellow_2};
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.br_2};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: ${(props) => props.theme.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;
