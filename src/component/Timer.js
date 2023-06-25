import React, { useEffect,  } from 'react'


export default function Timer({dispatch, secondsRemaining}) {

  const min=  Math.floor(secondsRemaining/60);
  const sec = secondsRemaining%60
   useEffect(()=>{
  const time= setInterval(()=>{
      dispatch({type:"tick"})
    },1000);

    return ()=> clearInterval(time)

   },[dispatch])

  
    
  return (
    <div>
      <div className='timer'>{min<10 ? "0" : ""}{min}: {sec<10 ? "0" : ""}{sec}</div>
    </div>
  )
}
