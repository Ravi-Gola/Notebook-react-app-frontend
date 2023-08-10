import React, { useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/note/noteContext';
const SignUp = () => {
    const {showAlert}=useContext(noteContext)
    const navigate=useNavigate();
    const [user,setUser]=useState({Name:"",Email:"",Password:"",cPassword:""});
    const signupUser = async (name,email,password)=>{
      try {
        let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password }),
        });
  
        let result = await response.json();
        if (result.success) {
          navigate("/login");
          showAlert("Sign Up successfully","success")
        } else {
          showAlert(result.errors,"danger")
        }
      } catch (error) {
        console.log(error)
        showAlert("Something wrong...","danger")
      }
    }
    const handelSignup =(e)=>{
        e.preventDefault();
        if(user.Password===user.cPassword){
        signupUser(user.Name,user.Email,user.Password)
        }
        else{
          showAlert("Passwords does not Matched","danger")
        }
    }
    const onchange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  return (
    <>
     <div className="container text-light mt-5 pt-5">
        <div className="jumbotron bg-dark p-5 my-5">
          <h1 className="display-4 text-warning">Welcome to inotebook ! </h1>
          <p className="lead">
            This is a simple app which allows you to create your notes and store them on cloud securely and safely. you can access them from any where any time.
          </p>
          <hr className="my-4" />
          <h4 className="mb-5">Sign Up with your details.</h4>
          <div className="lead">
          <form onSubmit={handelSignup}>
     <div className="row mb-3">
    <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" name='Name' className="form-control" id="Name" minLength={3} required onChange={onchange} />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="Email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" name='Email' className="form-control" id="Email" required onChange={onchange}  />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" name='Password' className="form-control" id="Password" required minLength={8} onChange={onchange} />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="cPassword" className="col-sm-2 col-form-label">Confirm Password</label>
    <div className="col-sm-10">
      <input type="password" name='cPassword' className="form-control" id="cPassword" required minLength={8} onChange={onchange} />
    </div>
  </div>
  <button type="submit" className="btn btn-warning text-dark">SignUp</button>
</form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
