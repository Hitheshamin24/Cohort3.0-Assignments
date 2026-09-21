import React, { useCallback, useMemo, useState } from 'react'
import Child from './Child'

const App = () => {
  const [count, setCount] = useState(0)
  const [principal, setPrincipal] = useState(null)
  const [time, setTime] = useState(null)
  const [rate, setRate] = useState(null)

  const result = useMemo(() => {
    console.log("calculating")
    return (principal * time * rate) / 1000
  }, [principal, time, rate])
  const increase = () => {
    setCount(count + 1)
  }

  const handleClick = useCallback(() => {

    console.log("clicked")
  }, []

  )

  // const handleClick=()=>{
  //   console.log("clicked")
  // }
  console.log('app rerender')
  return (
    <div>
      <div className='useMemo'>
        <p>{count}</p>
        <button onClick={increase}>Increase</button>
      </div>

      <div className='si'>
        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder='principal' />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder='rate' />
        <input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder='time' />

        <p>{result}</p>
      </div>
      <Child onClick={handleClick} />
    </div>
  )
}

export default App