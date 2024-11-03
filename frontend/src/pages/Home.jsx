import {useState, useEffect} from 'react'
import api from "../api"
import Note from '../components/Note'
import "../styles/Home.css"
import Navbar from '../components/Navbar'

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.
      get("api/notes/")
      .then((res)  => res.data)
      .then((data) => {setNotes(data); console.log(data);})
      .catch((error) => alert(error))
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if(res.status === 204) 
        alert("Note deleted!")
      else alert("Failed to delete note")
    }).catch((error) => alert(error));

    getNotes();
  }

  const createNote = (e) => {
    e.preventDefault();
    api.post("/api/notes/", {content, title})
    .then((res) => {
      if (res.status === 201 ) 
        alert("Note created")
      else 
        alert("Failed to create note.")
    }).catch((error) => alert(error));

    getNotes();
  }

  return (
    <div>
      <Navbar/>
      <h2 className='note-head-title'>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br/>
        <input 
          type='text' 
          id='title' 
          name='title' 
          required 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br/>
        <label htmlFor='content'>Content:</label>
        <br/>
        <textarea 
          type='text' 
          id='content' 
          name='content' 
          required 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
          <br/>
          <input type="submit" value="Submit"></input>
      </form>

      <div>
        <h2>Notes List</h2>
        { notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id}/>
        ))}
      </div>
    </div>
  )
}

export default Home
