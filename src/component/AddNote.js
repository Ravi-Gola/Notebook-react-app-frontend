import React, { useContext, useState } from "react";
// import { Link } from 'react-router-dom'
import noteContext from "../context/note/noteContext";
const AddNote = () => {

  const {addNote}=useContext(noteContext);
  const [note,setNote]=useState({title:"",description:"",tag:"General"})
  const handelSubmit=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setNote({title:"",description:"",tag:"General"})
  }
  const onchange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
   }
  return (
    <div className="container  my-3">
      <div className="card border border-0">
        <h5 className="card-header  bg-warning">Add Note</h5>
        <div className="card-body bg-dark">
          <form>
            <div className="form-group">
              <label className="text-light" htmlFor="title">
                Title:
              </label>
              <input type="text" className="form-control" name="title"value={note.title} onChange={onchange} id="title" />
            </div>
            <div className="form-group">
              <label className="text-light" htmlFor="description">
                Description:
              </label>
              <textarea
                className="form-control"
                rows="5"
                id="description" name="description" value={note.description} onChange={onchange}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="text-light" htmlFor="tag">
                Tag:
              </label>
              <input type="text" className="form-control" name="tag" value={note.tag} onChange={onchange} id="tag" />
            </div>
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" onClick={handelSubmit} className="btn btn-warning text-light my-2">
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
