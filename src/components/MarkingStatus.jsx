import styled from "styled-components";
import { useEffect, useState } from "react";

const MarkList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 50px;
`;

function MarkingStatus({ userList }) {
  const [marked, setMarked] = useState([]);
  const [unMarked, setUnMarked] = useState([]);
  useEffect(() => {
    const users = Object.keys(userList);
    const newMarked = [];
    const newUnMarked = [];

    for (const user of users) {
      // 유저 리스트의 유저의 선택한 날짜의 개수가 0 이라면
      if (userList[user].notAvalDates.length === 0) {
        newUnMarked.push(userList[user]);
      } else {
        newMarked.push(userList[user]);
      }
    }

    setMarked(newMarked);
    setUnMarked(newUnMarked);
  }, [userList]);

  console.log(marked, unMarked);

  return (
    <MarkList>
      <div>
        <h3>마킹 완료</h3>
        {marked.map((user) => (
          <div key={user.email}>{user.displayName}</div>
        ))}
      </div>

      <div>
        <h3>기다리는 중...</h3>
        {unMarked.map((user) => (
          <div key={user.email}>{user.displayName}</div>
        ))}
      </div>
    </MarkList>
  );
}

export default MarkingStatus;
