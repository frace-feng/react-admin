import { useRef, useEffect,useState } from "react";

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  const startTimeRef = useRef(Date.now());
  const [timeInfo,setTimeInfo] = useState({hour:0,minute:0,second:0})

  useEffect(() => {
    startTimeRef.current =Date.now();
    function calcTime(){
      const now = Date.now();
      const remain = startTimeRef.current + seconds * 1000 - now; // 毫秒
      if(remain <=0){
        clearInterval(timer)
      }
      const secondsRemain = Math.floor(remain / 1000);
      const hour = Math.floor(secondsRemain / 3600);
      const minute = Math.floor((secondsRemain - 3600 * hour) / 60);
      const second = secondsRemain - 3600 * hour - minute * 60;
      setTimeInfo({hour,minute,second})
    }
    const timer = setInterval(() => {
      calcTime()
    }, 900);
    calcTime()

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);


  return (
    <div>
      {timeInfo.hour}:{timeInfo.minute}:{timeInfo.second}
    </div>
  );
};

export default Countdown;
