import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../stores/counterSlice.js'
import { useSum } from '../hooks/useInput.js'
import { Button ,Input, Card} from 'antd'
import { useState } from 'react'

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const countPlusTwo = useSelector(state => state.counter.value + 2)
  const [input1Val,setInput1Val] = useState(0)
  const [input2Val,setInput2Val] = useState(0)
  const inputResult = useSum([input1Val,input2Val])
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          type="primary"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button>{countPlusTwo}</Button>
      </div>
      <div>
        <Input type='number' value={input1Val} onChange={e=>setInput1Val(+e.target.value)}></Input>
        <Input type='number' value={input2Val} onChange={e=>setInput2Val(+e.target.value)}></Input>

        <Card>
          {inputResult}
        </Card>
      </div>
    </div>
  )
}