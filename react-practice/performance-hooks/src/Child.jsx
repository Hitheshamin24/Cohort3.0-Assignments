import React from 'react'

const Child = React.memo(({onClick}) => {
    console.log("child rendered")
  return (
    <div>

        <button onClick={onClick}>
            click
        </button>
    </div>
  )
})

export default Child