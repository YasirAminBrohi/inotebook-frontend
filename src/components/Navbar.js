import React,{useContext, useEffect, useState} from 'react';
import NoteContext from '../context/noteContext';
import { useLocation,useNavigate } from 'react-router-dom';

   
function Navbar (props) {
    const a =useContext(NoteContext);
    const location=useLocation();
    let navigator=useNavigate();
    const shouldShowNavbar = ()=>{
        if(location.pathname==='/login'){
            return false;
        }
        if(location.pathname==='/logup'){
            return false;
        }
        return true;
    }
    let logoutClicked=(event)=>{
        event.preventDefault();
        localStorage.removeItem("user_token")
        navigator("/login");
    }

    let [userName,setUserName]=useState("");
    async function setUser(){
        const url="http://localhost:5000/api/auth/getuser";
        let response=await fetch(url,{
            method:'POST',
            headers:{
                'authToken':localStorage.getItem('user_token')
            }
        })
        if(response.ok){
            const data=await response.json()
            setUserName(data.name);
        }
    }
useEffect(()=>{
    setUser();
},[])

    return (
        <div>
            {shouldShowNavbar() && (
                
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">{/*bg-body-tertiary*/}
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{a.name}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" href="/about">About</a>
                            </li>
                        </ul>
                        
                        <form className="d-flex" role="search">
                            <div style={{color:'white',marginRight:'100'}}>
                            <h3><span class="badge bg-secondary">{userName}</span></h3>
                            </div>
                            *<button className="btn btn-success" type='submit' onClick={logoutClicked}>Logout</button>*
                        </form>
                    </div>
                </div>
            </nav>)}
            </div>
    )
}

export default Navbar
