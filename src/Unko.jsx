import { useEffect, useState } from "react";

export const Unko = () => {
  const [num, setNum] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const onClickCountUp = () => {
    setNum((prev) => prev + 1);
  };

  const onClickToggle = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (num > 0) {
      if (num % 3 === 0) {
        isShow || setIsShow(true);
      } else {
        isShow && setIsShow(false);
      }
    }
  }, [num]);

  return (
    <>
      <button onClick={onClickCountUp}>カウントアップ</button>
      <p>{num}</p>
      <button onClick={onClickToggle}>on / off</button>
      {isShow && <p>unko</p>}
    </>
  );
};
