# next-callback-event

関数のインスタンスを更新せず、関数の挙動のみ更新するサンプル

https://next-callback-event.vercel.app/

```tsx
"use client";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";

// 関数のインスタンスを変えずに、関数の挙動を更新する
export function useCallbackEvent<T extends (...args: unknown[]) => unknown>(
  callback: T
) {
  const property = useRef<{ callback: T }>(null);
  useImperativeHandle(property, () => ({ callback }));
  return useCallback((...args: Parameters<T>) => {
    if (!property.current) throw "callback is null";
    return property.current.callback(...args);
  }, []);
}

const Page = () => {
  const [valueA, setValueA] = useState(10);
  const [valueB, setValueB] = useState(20);
  const [answer, setAnswer] = useState(0);

  // valueA,valueBを更新しつつ、関数のインスタンスは変えない
  const handleAnswer = useCallbackEvent(() => {
    setAnswer(valueA + valueB);
  });

  // handleAnswerのインスタンスは変更されないので、useEffectのコールバックkはvalueA,valueBを更新しても呼ばれない
  useEffect(() => {
    const t = setInterval(() => {
      handleAnswer();
    }, 100);
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
```
