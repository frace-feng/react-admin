import React from 'react';
import ClassComp from './ClassComp';
import FuncComp from './FuncComp';
import useCountDown from './useCountDown';

const App: React.FC = () => {
  const timeInfo = useCountDown({seconds:3670})
  
  return (
    <>
    <h1>
      类组件实现
    </h1>
    <ClassComp seconds={3670}></ClassComp>
    <h1>
      函数组件实现
    </h1>
    <FuncComp seconds={3670} />
    <h1>hook实现</h1>
    {timeInfo.hours}:{timeInfo.minutes}:{timeInfo.seconds}
    </>
  );
};

export default App;
