
// 封装了一个倒计时hook
// 封装一个hook，分几步
// 

import { useRef, useEffect, useState } from "react";

interface CountdownProps {
  seconds: number;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountDown = ({ seconds }: CountdownProps) => {
  const startTimeRef = useRef(Date.now());
  const [timeInfo, setTimeInfo] = useState({})

  useEffect(() => {
    startTimeRef.current = Date.now();
    function calcTime() {
      const now = Date.now();
      const remain = startTimeRef.current + seconds * 1000 - now; // 毫秒
      if (remain <= 0) {
        clearInterval(timer)
      }
      setTimeInfo(parseMs(remain))
    }
    const timer = setInterval(() => {
      calcTime()
    }, 900);
    calcTime()

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);


  return timeInfo;
};

export default useCountDown;
