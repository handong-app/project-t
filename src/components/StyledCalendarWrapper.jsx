import Calendar from "react-calendar";
import styled, { css } from "styled-components";
import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
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

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
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

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
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
  /* 오늘 날짜 hover */
  .react-calendar__tile--now:enabled:hover {
    background-color: #e6e6e6;
  }
  /* 오늘 날짜 클릭 */
  .react-calendar__tile--now:enabled:focus {
    background: #1087ff;
    color: white;
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
    margin-top: 8px;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active,
  .selectedDate,
  .selectedDate.react-calendar__tile:enabled:focus {
    background-color: ${(props) =>
      props.readOnly ? "grey" : props.theme.colors.purple500};
    color: white;
    border-radius: 0.5rem;
  }

  /* Focus style 취소 */
  .react-calendar__tile:enabled:focus {
    background-color: white;
    color: black;
  }

  // Read Only Mode
  ${(props) =>
    props.readOnly &&
    css`
      // Read only 시 hover 효과 취소
      .react-calendar__tile:enabled:hover:not(.selectedDate),
      .react-calendar__tile:enabled:focus {
        background-color: white;
        color: black;
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
