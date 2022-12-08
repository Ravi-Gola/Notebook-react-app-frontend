import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { Link } from "react-router-dom";
import noteContext from "../context/note/noteContext";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const navigate=useNavigate();
  const { Notes, getNotes,updateNote,showAlert} = useContext(noteContext);
  useEffect(() => {
    let token=localStorage.getItem('token')
    if(token){
      getNotes();
    }
    else{
      showAlert("Please login or signup first","danger")
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  
  const [Note,setNote]=useState({id:"",U_title:"",U_description:"",U_tag:"General"})
  const refOpen = useRef(null);
  const refClose = useRef(null);

  const openModal = (note) => {
    refOpen.current.click();
    setNote({id:note._id,U_title:note.title,U_description:note.description,U_tag:note.tag})
  };

  const handelSubmit =(e)=>{
    e.preventDefault();
    updateNote(Note.id,Note.U_title,Note.U_description,Note.U_tag);
    refClose.current.click();
  }
  const onchange =(e)=>{
        setNote({...Note,[e.target.name]:e.target.value})
        console.log("you are Updating..")
  }
  return (
    <div className="container my-5 pt-5">
      <AddNote />
      
      {/* modal for update note */}
      <button
        type="button"
        style={{ display: "none" }}
        ref={refOpen}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body bg-dark">
              <form>
                <div className="form-group">
                  <label className="text-light"  htmlFor="U_title">
                    Title:
                  </label>
                  <input type="text" className="form-control" name="U_title" value={Note.U_title} onChange={onchange} id="U_title" />
                </div>
                <div className="form-group">
                  <label className="text-light" htmlFor="U_description">
                    Description:
                  </label>
                  <textarea
                  value={Note.U_description}
                    onChange={onchange}
                    className="form-control"
                    rows="5"
                    name="U_description"
                    id="U_description"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-light" htmlFor="U_tag">
                    Tag:
                  </label>
                  <input type="text" className="form-control" value={Note.U_tag} name="U_tag" onChange={onchange} id="U_tag" />
                </div>
                <button
                disabled={Note.U_title.length<3 || Note.U_description.length<5}
                  type="submit"
                  className="btn btn-warning text-light my-2"
                  onClick={handelSubmit}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2">
        <ul className="nav nav-pills p-3 bg-dark mx-2 mb-3 rounded-pill align-items-center">
          <li className="nav-item">
            <Link
              className="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 bg-warning text-dark active"
              id="all-category"
            >
              <i className="icon-layers mr-1"></i>
              <span className="d-none d-md-block">
                <b>All Notes</b>
              </span>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-warning"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Your Tags
            </Link>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item">General</button>
              </li>
              <li>
                <button className="dropdown-item">Personel</button>
              </li>
              <li>
                <button className="dropdown-item">Bussiness</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="container d-flex flex-wrap">
        <h5 className="text-light w-100 text-center mt-5">{Notes.length === 0 && "No notes to be display. Please add some notes"}</h5>
        {Notes.map((note) => {
          return <NoteItem key={note._id} openModal={openModal} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
