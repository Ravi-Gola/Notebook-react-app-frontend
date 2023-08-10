import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    let n=[]
    const [Notes, setNotes] = useState(n);
    const [display,setdisplay]=useState("none");
    const [alertmsg,setAlertmsg]=useState("");
    const [alerttype,setAlerttype]=useState("");
    //function for show alert
    const showAlert =(msg,type)=>{
      setAlertmsg(msg)
      setAlerttype(type)
      setdisplay("block");
      setTimeout(()=>{
      setdisplay("none")
      },3000)
    }

    //Function for get notes : login require
    const getNotes = async ()=>{
        let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/notes/fetchAllnote`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          
          let result = await response.json();
          if(result.Success){
            setNotes(result.notes);
          }else{
            showAlert(result.error,"danger")
          }
    }
     //Function for add notes : login require
    const addNote =async (title,description,tag) =>{
        let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/notes/addNote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          
          let result = await response.json();
          if(result.Success){
            showAlert("you have added your note successfully","success")
            setNotes(Notes.concat(result.note));
          }
          else{
            showAlert(result.error,"danger")
          }
    }

    // Function for delete notes:login require
    const deleteNote = async(id)=>{
        let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          
          let result = await response.json();
          if(result.Success){
            showAlert("you have deleted your note successfully","success")
            let newNotes=Notes.filter((note)=>{ return note._id !== id})
            setNotes(newNotes);
          }
          else{
            showAlert(result.error,"danger")
          }
          // console.log(note)
    }

    // function for update note:login required
    const updateNote = async (id,title,description,tag)=>{
      let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/notes//updateNote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      
      let result = await response.json();
      if(result.Success){
        showAlert("Your note updated successfully","success")
        let newNotes=Notes.filter((note)=>{ return note._id !== id})
        newNotes.push(result.note)
        setNotes(newNotes)
      }
      else{
        showAlert(result.error,"danger")
      }
      // console.log(result.note)
      
    }
    return (
        <NoteContext.Provider value={{Notes,display,alertmsg,alerttype,showAlert,setdisplay,setNotes,getNotes,addNote,deleteNote,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;