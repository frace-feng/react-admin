import { Component } from "react";

interface CountdownState {
  timeInfo: {
    hour: number;
    minute: number;
    second: number;
  };
}
interface CountdownProps {
  seconds: number;
}

class Countdown extends Component<CountdownProps, CountdownState> {
  private timer: number | undefined = undefined;
  private startTime: number = Date.now();

  constructor(props: CountdownProps) {
    super(props);
    this.state = {
      timeInfo: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    };
  }

  componentDidMount() {
    this.startTime=Date.now();
    this.calcTime()
    this.timer = setInterval(() => {
      this.calcTime()
    }, 900);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  calcTime=()=>{
    const now = Date.now();
    const remain = this.startTime + this.props.seconds * 1000 - now; // 毫秒
    if(remain <=0){
      clearInterval(this.timer)
    }
    const secondsRemain = Math.floor(remain / 1000);
    const hour = Math.floor(secondsRemain / 3600);
    const minute = Math.floor((secondsRemain - 3600 * hour) / 60);
    const second = secondsRemain - 3600 * hour - minute * 60;
    this.setState({timeInfo:{hour,minute,second}})
  }

  render() {
    const { timeInfo } = this.state;

    return <div> {timeInfo.hour}:{timeInfo.minute}:{timeInfo.second}</div>;
  }
}

export default Countdown;
