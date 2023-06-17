import { useEffect, useState } from "react"
import React from 'react'
import NoteItems from "./NoteItems";


const Notes = ({ refresh, onNotesRefreshed,onNoteAdded,onNoteUpdated  }) => {
  
  let [notes, setNotes] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [doRefresh,SetDoRefresh]=useState(false);
  let [noteData, setNoteData] = useState({
    id: "",
    title: "",
    description: "",
    tag: ""
  })

  let addNote = async (id, title, description, tag) => {
    const url = `http://localhost:5000/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("user_token")
      },
      body: JSON.stringify({
        title: title,
        "description": description,
        "tag": tag
      })
    });
    if (response.ok) {
      onNoteAdded();
      if(!doRefresh){
        SetDoRefresh(true)
    }
    
    onNotesRefreshed();

    } else {
      let error = await response.json()
    }
  }



  useEffect(() => {
if(refresh){
    getNotes();
}

onNotesRefreshed();
  }, [refresh])

  useEffect(() => {
    if(doRefresh){
        getNotes();
    }
    
    SetDoRefresh();
      }, [doRefresh])

  useEffect(() => {
        getNotes();
    
      }, [])

      const handleClose = () => {
        setShowModal(false);
      };
    
      useEffect(() => {
        if (showModal) {
          // Code to open the modal when showModal becomes true
          const myModal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
          myModal.show();
        }
      }, [showModal]);


  let getNotes = async () => {
    const url = "http://localhost:5000/api/notes/fetchallnotes";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("user_token")
      },

    });
    if (response.ok) {
      let data = await response.json()
      setNotes(data)
    }
  }




  const handleSubmit = (event) => {
    addNote(noteData._id, noteData.title, noteData.description, noteData.tag);
    console.log("updated data", noteData)
    event.preventDefault();
  };
  let editNote = (currentNote) => {
    setShowModal(true);
    setNoteData(currentNote)
  }
  const onchange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: value
    }));
  };


  return (

    <>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={noteData.title} onChange={onchange} id="title" name="title" className="form-control" />
                  </div>
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" value={noteData.description} onChange={onchange} name="description" id="description" rows={5} cols={5}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" value={noteData.tag} onChange={onchange} className="form-control" name="tag" id="tag" />
                  <div id="emailHelp" className="form-text">tag should start by '#'. etc #game</div>
                </div>
                <div className='conatiner text-center' style={{ color: 'red' }}>
                  <p>{errorMessage}</p>
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItems key={note._id} editNote={editNote} notesitem={note}  onNoteAdded={onNoteAdded}/>
        })}
      </div>
    </>
  )
}

export default Notes