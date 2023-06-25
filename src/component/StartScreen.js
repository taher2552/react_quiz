import React from 'react'

export default function StartScreen({totalQuestion , dispatch}) {
  return (
    <div className='start'>
      <h2>Welcome to the react quiz</h2>
      <h3>there are {totalQuestion} questions to test your react mastery</h3>
      <button onClick={ ()=>dispatch({type:"isStart"})} className='btn btn-ui'>Let's start</button>
    </div>
  )
}
