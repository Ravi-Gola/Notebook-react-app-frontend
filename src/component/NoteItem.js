import React, { useContext } from "react";
import noteContext from "../context/note/noteContext";
const NoteItem = (props) => {
    const {openModal , note}=props;
    const {deleteNote}=useContext(noteContext)
  return (
    <div className="card position-relative m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <div className="border-5 border-start border-warning w-100 p-2">
          <h5 className="card-title ">{note.title}...</h5>
          <h6 className="card-subtitle mb-2 text-primary">{note.date}</h6>
        </div>
        <p className="card-text">
          {note.description}
        </p>
        <div className="">
          <div className="position-absolute bottom-0 start-0 m-2">
            <i  className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}} ></i>
            <i className="fa-solid fa-pen-to-square" onClick={()=>{ openModal(note) }}></i>
          </div>
          <div className="position-absolute bottom-0 end-0 m-2">
          <span className="mx-2">{note.tag}</span>
            <i className="fa-solid fa-tags text-warning"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
