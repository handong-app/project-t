import styled from "styled-components";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import moment from "moment";
import { firestore } from "../tools/firebase"; // assuming this is your firebase setup file

const MarkList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 50px;
`;

const AboveList = styled.div`
  margin-bottom: 50px;
`;

const BottomList = styled.div`
  margin-bottom: 50px;
`;

const VoteBtn = styled.button`
  background-color: ${(props) => props.theme.colors.purple400};
  color: white;
`;

function MarkingStatus({ roomInfo }) {
  const { surveyId } = useParams();
  const firebaseDoc = doc(firestore, "room", surveyId);

  const [marked, setMarked] = useState([]);
  const [unMarked, setUnMarked] = useState([]);
  const [goVote, setGoVote] = useState(true);

  const fetchData = async () => {
    const users = Object.keys(roomInfo.responsedata);
    const newMarked = [];
    const newUnMarked = [];
    const dateCount = {};

    const startDate = moment(roomInfo.r_fDate); // 시작 날짜
    const endDate = moment(roomInfo.r_sDate); // 마지막 날짜

    for (const user of users) {
      if (roomInfo.responsedata[user].notAvalDates.length === 0) {
        newUnMarked.push(roomInfo.responsedata[user]);
        setGoVote(false);
      } else {
        newMarked.push(roomInfo.responsedata[user]);
        roomInfo.responsedata[user].notAvalDates.forEach((date) => {
          dateCount[date] = (dateCount[date] || 0) + 1;
        });
      }
    }

    if (newUnMarked.length === 0) {
      setGoVote(true);
    } else {
      setGoVote(false);
    }

    setMarked(newMarked);
    setUnMarked(newUnMarked);

    // 기간 설정
    const dateRange = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dateRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "days");
    }

    // 선택 안된 날짜들
    const mostSelectedDates = dateRange.filter((date) => !dateCount[date]);

    // Firestore에 선택한 날짜 저장
    await updateDoc(firebaseDoc, {
      AvailDate: mostSelectedDates,
    });

    console.log("room A", roomInfo);
  };

  useEffect(() => {
    fetchData();
  }, [roomInfo]);

  return (
    <MarkList>
      <AboveList>
        <h3>마킹 완료</h3>
        {marked.length === 0 ? (
          <h5>모든 유저가 마킹을 하지 않음</h5>
        ) : (
          marked.map((user) => <div key={user.email}>{user.displayName}</div>)
        )}
      </AboveList>

      <BottomList>
        <h3>기다리는 중...</h3>
        {unMarked.length === 0 ? (
          <h5>모든 유저 마킹 완료</h5>
        ) : (
          unMarked.map((user) => <div key={user.email}>{user.displayName}</div>)
        )}
      </BottomList>
      {goVote ? <VoteBtn onClick={fetchData}>투표 시작</VoteBtn> : <></>}
    </MarkList>
  );
}

export default MarkingStatus;
