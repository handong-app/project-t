import styled from "styled-components";
import { useEffect, useState } from "react";

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

function MarkingStatus({ userList }) {
  const [marked, setMarked] = useState([]);
  const [unMarked, setUnMarked] = useState([]);
  const [goVote, setGoVote] = useState(true);

  useEffect(() => {
    const users = Object.keys(userList);
    const newMarked = [];
    const newUnMarked = [];

    for (const user of users) {
      // 유저 리스트의 유저의 선택한 날짜의 개수가 0 이라면
      if (userList[user].notAvalDates.length === 0) {
        newUnMarked.push(userList[user]);
        setGoVote(false);
      } else {
        newMarked.push(userList[user]);
      }
    }

    if (newUnMarked.length == 0) {
      setGoVote(true);
    } else {
      setGoVote(false);
    }

    setMarked(newMarked);
    setUnMarked(newUnMarked);
  }, [userList]);

  return (
    <MarkList>
      <AboveList>
        <h3>마킹 완료</h3>
        {marked.length == 0 ? (
          <h5>모든 유저가 마킹을 하지 않음</h5>
        ) : (
          marked.map((user) => <div key={user.email}>{user.displayName}</div>)
        )}
      </AboveList>

      <BottomList>
        <h3>기다리는 중...</h3>
        {unMarked.length == 0 ? (
          <h5>모든 유저 마킹 완료</h5>
        ) : (
          unMarked.map((user) => <div key={user.email}>{user.displayName}</div>)
        )}
      </BottomList>
      {goVote ? <VoteBtn>투표 시작</VoteBtn> : <></>}
    </MarkList>
  );
}

export default MarkingStatus;
