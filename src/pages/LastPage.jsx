import React from "react";
import { useNavigate } from "react-router-dom";

function LastPage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>일정 제목</p>
      <li>1위 : ~</li>
      <li>2위 : ~</li>
      <button onClick={() => console.log("재투표")}>재투표하기</button>
      {/** 투표 페이지로 이동*/}
      <button onClick={() => console.log("시간 수정")}>
        시간 수정하기
      </button>{" "}
      {/** 시간 수정 페이지로 이동*/}
    </div>
  );
}

export default LastPage;
