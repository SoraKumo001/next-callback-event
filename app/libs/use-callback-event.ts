import { useCallback, useImperativeHandle, useRef } from "react";

// Update the behavior of a function without changing its instance
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
