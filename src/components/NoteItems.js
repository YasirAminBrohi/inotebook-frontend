import React, { useState } from 'react';

function NoteItems(props) {
  let deleteNote = async (id) => {
    const url = `http://localhost:5000/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("user_token")
      },
    });
    if (response.ok) {
      props.onNoteAdded();
    }
    console.log("Never clicked but it given id " + id);
  };


  const handleDeleteNote = () => {
    deleteNote(props.notesitem._id);
  };

const handleEditNote=()=>{
    props.editNote(props.notesitem)
}

  return (
    <div className='col-md-3'>
      <div className="card align-items-center">
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5>{props.notesitem.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={handleDeleteNote}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEditNote}></i>
          </div>
          <p>{props.notesitem.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItems;
