import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserDetails({currUser}){

    const navigate = useNavigate()

    function clickHandler(){
        navigate(-1)
    }
    
    return(
        <div className="userdetails">
            <div className="userdetails-btn"> 
                <h1><button type="button" onClick={clickHandler}>Back</button>Details:{currUser.first_name} {currUser.last_name}</h1>
            </div>
           
            <ul className="userdetails-list">
                <li>First Name : <b>{currUser.first_name}</b></li>
                <li>Last Name : <b>{currUser.last_name}</b></li>
                <li>Company Name : <b>{currUser.company_name}</b></li>
                <li>City : <b>{currUser.city}</b></li>
                <li>State : <b>{currUser.state}</b></li>
                <li>Zip : <b>{currUser.zip}</b></li>
                <li>Email : <b>{currUser.email}</b></li>
                <li>Web : <b>{currUser.web}</b></li>
                <li>Age : <b>{currUser.age}</b></li>
            </ul>
        </div>
    )
}