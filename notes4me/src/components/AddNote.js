import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {

  const context = useContext(NoteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})

  }

  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form className='my-3' action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} minLength={3} required placeholder="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} minLength={3} required placeholder="tag" />
          </div>
          <button disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} type='submit' className='btn btn-primary' onClick={handleSubmit}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
