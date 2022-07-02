import React, { useState } from "react";

export default function Searchbar({setSearchText}){
    const [inputVal,setInputval] = useState("")
    
    function submitHandler(){
        setSearchText(inputVal)
    }
    return(
        <div className="serachbar">
            <input type="text" 
                    placeholder="Search by first or last name" 
                    value={inputVal}
                    onChange={(e)=>setInputval(e.target.value)}
                    />
            <button type="button" onClick={submitHandler}>Search</button>
        </div>
    )
}