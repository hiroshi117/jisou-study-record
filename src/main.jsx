import React, { StrictMode, useState } from "react";
import ReactDom from "react-dom/client";

const App = () => {
  const [recordText, setRecordText] = useState("");
  const onChangeRecordText = (event) => {
    setRecordText(event.target.value);
  };

  const [recordTime, setRecordTime] = useState(0);
  const onChangeRecordTime = (event) => {
    setRecordTime(event.target.value);
  };

  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [time, setTime] = useState([]);

  const onClickAdd = () => {
    if (recordText === "" || recordTime === 0) {
      setError("入力されていない項目があります");
      return;
    }
    setError("");
    const newRecord = { title: recordText, time: recordTime };
    setRecords([...records, newRecord]);
    setTime([...time, parseInt(recordTime, 10)]);
    setRecordText("");
    setRecordTime(0);
  };

  const totalTime = time.reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        学習内容
        <input value={recordText} onChange={onChangeRecordText} />
      </div>
      <div>
        学習時間
        <input value={recordTime} onChange={onChangeRecordTime} type="number" />
      </div>
      <div>入力されている学習内容：{recordText}</div>
      <div>入力されている時間：{recordTime}</div>
      <div>
        {records.map((record) => (
          <div key={record.title}>
            {record.title}&ensp;
            {record.time}時間
          </div>
        ))}
      </div>
      <button onClick={onClickAdd}>登録</button>
      {error && <div>{error}</div>}
      <div>合計時間：{totalTime} / 1000（h）</div>
    </>
  );
};

ReactDom.createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
