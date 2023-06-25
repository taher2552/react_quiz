import React from 'react'

export default function Progress({index, totalQuestion, points, totalPoints, answer}) {
  return (
    <header className='progress'>
    <progress max={totalQuestion} value={index+ Number(answer!==null)}></progress>
    <p>Question <strong>{index+1}</strong>/ {totalQuestion}</p>
    <p><strong>{points}</strong>/ {totalPoints}</p>
      
    </header>
  )
}
