import React, { useState, useEffect } from 'react';

const AddNotes = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addNote = async (title, description, tag) => {
    const url = "http://localhost:5000/api/notes/addnotes";
    const data = {
      title: title,
      description: description,
      tag: tag
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("user_token")
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.errors[0].msg);
    } else {
      setShowModal(true);
      props.onNoteAdded();
      setErrorMessage("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const tag = document.getElementById('tag').value;
    addNote(title, description, tag);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      // Code to open the modal when showModal becomes true
      const myModal = new window.bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    }
  }, [showModal]);



  return (
    <div className='container my-3'>
      <div className='modal fade' id='myModal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Note Added</h5>
              <button type='button' className='close' data-bs-dismiss='modal' aria-label='Close' onClick={handleClose}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Your note has been successfully added.</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" />
          </div>
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows={5} cols={5}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" />
          <div id="emailHelp" className="form-text">tag should start by '#'. etc #game</div>
        </div>
        <div className='conatiner text-center' style={{ color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
        <div className='d-flex justify-content-between'>
          <button type='submit' className='btn btn-primary'>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
