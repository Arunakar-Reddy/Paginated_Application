import React, { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import Searchbar from "./components/Searchbar";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";

function App() {
  const [searchText,setSearchText] = useState("")
  const [userdet,setUserdet] = useState({})

  return (
    <div className="App">
      <h1>Users</h1>
      <Searchbar setSearchText={setSearchText}/>
      <Routes>
        <Route path="/Paginated_Application/users" element={<UsersList searchText = {searchText} setSearchText={setSearchText} userdet = {setUserdet} />} ></Route>
        <Route path="/Paginated_Application/users/:id" element={<UserDetails currUser={userdet} />} ></Route>
      </Routes>
      

    </div>
  );
}

export default App;
