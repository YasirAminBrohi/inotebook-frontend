import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/noteContext';


function About() {
  let navigate=useNavigate();
  let a=useContext(NoteContext);
  

  useEffect(()=>{
    if(!a.token){
      navigate("/login")
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <h1>Hey, this is About route</h1>
    </div>
  )
}

export default About
