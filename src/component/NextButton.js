import React from 'react'

export default function NextButton({dispatch, answer, index, totalQuestion}) {

  if(answer===null) return null;

if(index < totalQuestion-1){

  return (
    <div>
       
       <button className='btn btn-ui' onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
     
    </div>
  )

}
if(index === totalQuestion-1){

  return (
    <div>
       
       <button className='btn btn-ui' onClick={()=>dispatch({type:"finish"})}>Finish</button>
     
    </div>
  )

}


}
