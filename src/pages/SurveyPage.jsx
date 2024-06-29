import moment from "moment";
import React, { useEffect, useState } from "react";
import MarkCalendar from "../components/MarkCalendar";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../tools/firebase";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserEmailState } from "../store/atom";

function SurveyPage() {
  const userEmail = useRecoilValue(UserEmailState);
  const { displayName, email } = auth.currentUser;
  const email_ = email.replaceAll(".", "_");

  const [editMode, setEditMode] = useState(false);
  const [mySelectedDate, setMySelectedDate] = useState([]);
  const [readOnlyFocusDate, setReadOnlyFocusDate] = useState();
  const formattedReadOnlyFocusDate =
    moment(readOnlyFocusDate).format("YYYY-MM-DD");

  const [roomInfo, setRoomInfo] = useState(null);

  const { surveyId } = useParams();

  const firebaseDoc = doc(firestore, "room", surveyId);

  const toggleMode = async () => {
    if (editMode) {
      // 수정모드에서 저장.
      await updateDoc(firebaseDoc, {
        [`responsedata.${email_}`]: {
          email,
          displayName,
          notAvalDates: mySelectedDate.map((date) =>
            moment(date).format("YYYY-MM-DD")
          ),
        },
      });
      await getRoomInfo(); // 업데이트 되었기 때문에 새로운 정보 불러오기.
      setEditMode(false);
    } else {
      setEditMode(true);
    }

    // 모드가 바뀔 때 초기화 해야하는 것들
    setReadOnlyFocusDate(null);
  };

  const getRoomInfo = async () => {
    const roomDoc = (await getDoc(firebaseDoc)).data();
    console.log(roomDoc);
    setRoomInfo(roomDoc);

    // 내가 선택한 날짜가 있으면 state 와 동기화 해주기
    setMySelectedDate(
      (roomDoc.responsedata && roomDoc.responsedata[email_]?.notAvalDates) || []
    );
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  if (!roomInfo) return <div>Loading Room Info...</div>;

  // room info 가 로딩된 다음에 실행되야하는 것들
  const reservedDates = {};
  Object.values(roomInfo.responsedata || {}).map((markUserData) =>
    markUserData.notAvalDates?.map((date) => {
      reservedDates[date] = [...(reservedDates[date] || []), markUserData];
    })
  );
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
        <>
          <MarkCalendar
            readOnly={true}
            selectedDates={Object.keys(reservedDates)}
            setFocusDate={setReadOnlyFocusDate}
          />
          <h3>{formattedReadOnlyFocusDate}</h3>
          {(reservedDates[formattedReadOnlyFocusDate] || []).map((item) => (
            <div key={item.email}>{item?.displayName}</div>
          ))}
        </>
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
