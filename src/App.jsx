import React, { useEffect, useState } from "react";
import { getALLRecords } from "./utils/supabaseFunction";
import { addRecord } from "./utils/supabaseFunction";
import { deleteRecord } from "./utils/supabaseFunction";

export const App = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true);
      const data = await getALLRecords();
      setRecords(data);
      setIsLoading(false);
    };
    getRecords();
  }, []);
  const onClickAdd = async () => {
    if (recordText === "") {
      setError("学習内容を入力してください");
      return;
    }
    if (recordTime <= 0) {
      setError("学習時間は1以上を入力してください");
      return;
    }
    setError("");
    const newRecord = await addRecord(recordText, parseInt(recordTime, 10));
    setRecords([...records, newRecord]);
    setRecordText("");
    setRecordTime(0);
  };
  const totalTime = time.reduce((acc, cur) => acc + cur.time, 0);
  const onClickDelete = async (id) => {
    await deleteRecord(id);
    const newRecords = records.filter((record) => record.id !== id);
    setRecords(newRecords);
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <h1>学習記録一覧アプリ</h1>
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
        <div>
          {records.map((record) => (
            <div
              key={record.id}
              style={{ display: "flex", gap: "10px", margin: "5px 0" }}
            >
              {record.title}&ensp;
              {record.time}時間
              <button onClick={() => onClickDelete(record.id)}>削除</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onClickAdd}>登録</button>
      {error && <div>{error}</div>}
      <div>合計時間：{totalTime} / 1000（h）</div>
    </>
  );
};
