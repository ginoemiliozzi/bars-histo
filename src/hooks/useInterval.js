import { useRef, useEffect, useState } from "react";

export function useInterval(callback, delay, times, lastExecution) {
  const savedCallback = useRef();
  const [remainingTimes, setRemainingTimes] = useState(times);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      setRemainingTimes(remainingTimes - 1);
      savedCallback.current();
    }
    if (delay !== null && remainingTimes > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      lastExecution();
    }
  }, [delay, remainingTimes]);
}
