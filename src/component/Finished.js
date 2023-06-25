import React from 'react'

export default function Finished({points, totalPoints, highscore, dispatch}) {

    const percentage = (points/totalPoints)*100;
    let emoji;

    if(percentage === 100) emoji="🥇";
    if(percentage >=80 && percentage<100) emoji="🎉";
    if(percentage >=60 && percentage<80) emoji="🙂";
    if(percentage >=50 && percentage<60) emoji="😐";
    if(percentage >=33 && percentage<50) emoji="😟";
    if(percentage<33) emoji="😭";

  return (
    <div>
      <p className='result'><span>{emoji}</span> You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)</p>
      <p className='highscore'>High Score: {highscore} points</p>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"restart"})}>Restart</button>
    </div>
  )
}
