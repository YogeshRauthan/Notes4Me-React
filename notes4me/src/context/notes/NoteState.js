import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const token = localStorage.getItem('token');
    console.log("Retrieved token: ", token);

    // Get All Notes
    const getNotes = async () => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      console.log("Fetched Notes", json);
      
      // Ensure the fetched data is an array
      if (Array.isArray(json)) {
        setNotes(json);
      } 
      else {
        console.error("Fetched data is not an array");
      }
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
      const token = localStorage.getItem('token');
      console.log("Retrieved token for addNote: ", token);

      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      });
      const note = await response.json();
      if (Array.isArray(notes)) {
        setNotes([...notes, note]);
      } else {
        // If notes is not an array, log an error
        console.error("Error: notes is not an array");
      }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
      const token = localStorage.getItem('token');
      console.log("Retrieved token for addNote: ", token);

      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      });
      const json = await response.json();
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit the Notes
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }        
      }
      setNotes(newNotes);
    }

    // Delete a Note
    const deleteNote = async (id) => {
      const token = localStorage.getItem('token');
      console.log("Retrieved token for addNote: ", token);
      
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      console.log(json)

      // Logic to Delete a Note
      const newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)     
    }


    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, editNote, deleteNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;