import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { getALLRecords } from "./utils/supabaseFunction";

vi.mock("./utils/supabaseFunction", () => {
  return {
    getALLRecords: vi.fn(() => Promise.resolve([])),
    addRecord: vi.fn((title, time) => Promise.resolve({ id: 1, title, time })),
    deleteRecord: vi.fn(() => Promise.resolve()),
  };
});

test("タイトルが表示されている", async () => {
  render(<App />);
  expect(await screen.findByText("学習記録一覧アプリ")).toBeInTheDocument();
});

test("登録すると記録が1つ増える", async () => {
  render(<App />);
  await screen.findByText("学習記録一覧アプリ");

  expect(screen.queryAllByRole("button", { name: "削除" })).toHaveLength(0);

  await userEvent.type(screen.getByRole("textbox"), "React学習");
  await userEvent.type(screen.getByRole("spinbutton"), "2");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  const deleteButtons = await screen.findAllByRole("button", { name: "削除" });
  expect(deleteButtons).toHaveLength(1);
});

test("削除すると記録が1つ減る", async () => {
  // このテストの時だけ、最初から1件ある状態にする
  getALLRecords.mockResolvedValueOnce([{ id: 1, title: "React学習", time: 2 }]);

  render(<App />);
  await screen.findByText("学習記録一覧アプリ");

  // 最初は1件（削除ボタンが1つ）
  const deleteButtons = await screen.findAllByRole("button", { name: "削除" });
  expect(deleteButtons).toHaveLength(1);

  // 削除ボタンを押す
  await userEvent.click(deleteButtons[0]);

  // 0件に減っている
  expect(screen.queryAllByRole("button", { name: "削除" })).toHaveLength(0);
});

test("未入力で登録するとエラーが表示される", async () => {
  render(<App />);
  await screen.findByText("学習記録一覧アプリ");

  // 何も入力せず登録ボタンを押す
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  // エラーメッセージが表示される
  expect(
    await screen.findByText("学習内容を入力してください"),
  ).toBeInTheDocument();
});
