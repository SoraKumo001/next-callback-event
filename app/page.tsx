"use client";
import { useEffect, useState } from "react";
import { useCallbackEvent } from "./libs/use-callback-event";

const Page = () => {
  const [valueA, setValueA] = useState(10);
  const [valueB, setValueB] = useState(20);
  const [answer, setAnswer] = useState(0);

  // valueA,valueBを更新しつつ、関数のインスタンスは変えない
  const handleAnswer = useCallbackEvent(() => {
    setAnswer(valueA + valueB);
  });

  // handleAnswerのインスタンスは変更されないので、useEffectのコールバックはvalueA,valueBを更新しても呼ばれない
  useEffect(() => {
    const t = setInterval(() => {
      handleAnswer();
    }, 1000);
    console.log("effect");
    return () => clearInterval(t);
  }, [handleAnswer]);

  return (
    <div className="p-4">
      <div>
        A:
        <input
          className="outline p-1"
          type="number"
          value={valueA}
          onChange={(e) => setValueA(Number(e.target.value))}
        />
      </div>
      <div>
        B:
        <input
          className="outline p-1"
          type="number"
          value={valueB}
          onChange={(e) => setValueB(Number(e.target.value))}
        />
      </div>
      <div>Answer:{answer}</div>
    </div>
  );
};

export default Page;
