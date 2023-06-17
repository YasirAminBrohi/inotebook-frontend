import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom';


function Logup() {
  let [errorMessage, newErrorMessage] = useState("");
  const naviagate=useNavigate();
  let login = async (name,email, pass) => {
    let url = "http://localhost:5000/api/auth/createuser";
    const data = {
      name:name,
      email: email,
      password: pass
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const errorData = await response.json();
      if(errorData.jwt_data){
        localStorage.setItem("user_token",errorData.jwt_data)
        naviagate("/");
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      if(errorData.errors){
        newErrorMessage(errorData.errors.errors[0].msg)
        return;
      }
      newErrorMessage(errorData.error);
      return;
    }
  }
  let clicked = (event) => {
    event.preventDefault();
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const name=document.getElementById("name").value;
    login(name,email, password)
  }

  const redirectToLogin=()=>{
    naviagate("/login");
  }


  return (
    <div className='container my-3'>
      <form>
        <div className="mb-3">
        <div className="mb-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" />
        </div>
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <div className='conatiner text-center' style={{color:'red'}}>
          <p>{errorMessage}</p>
        </div>
        <div className='d-flex justify-content-between'>
        <button className="btn btn-primary" onClick={redirectToLogin}>Already Have Account</button>
        <button type='submit' className="btn btn-primary" onClick={clicked}>logup</button>
        </div>
      </form>
    </div>
  )
}

export default Logup
