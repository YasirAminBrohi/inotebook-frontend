import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AddNotes from './AddNotes';
import Notes from './Notes';

function Home() {
  let navigate=useNavigate();
  const [refreshNotes, setRefreshNotes] = useState(false);
 // const [ignored,forceUpdate]=useReducer(x=>x+1,0)
 /* const refresh=()=>{
    forceUpdate();
  }*/
  useEffect(()=>{
    if(!localStorage.getItem('user_token')){
      navigate("/login")
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleNoteAdded = () => {
    // Set the refreshNotes state to true to trigger a refresh of the Notes component
    setRefreshNotes(true);
  };

  const handleNotesRefreshed = () => {
    // Set the refreshNotes state back to false after the Notes component has been refreshed
    setRefreshNotes(false);
  };

  const handleNoteUpdated = () => {
    // Perform any actions or updates needed after a note is updated
    // For example, you can update a state or trigger a re-fetch of data
    setRefreshNotes(true); // Set the refreshNotes state to trigger the refresh of <Notes />
  };

  return (
    <>
    <div className='container'>
      <h1>Add a note</h1>
     <AddNotes onNoteAdded={handleNoteAdded}/>
      <h1>Your Notes</h1>
    <Notes refresh={refreshNotes} onNotesRefreshed={handleNotesRefreshed} onNoteAdded={handleNoteAdded} />
    </div>


</>
  )
}

export default Home
