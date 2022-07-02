import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import {useNavigate, Outlet} from 'react-router-dom'
import Pagination from "./Pagination";

export default function UsersList({searchText,setSearchText,userdet}){
    const [users,setUsers] = useState([])
    const [currUsers,setCurrUsers] = useState([])
    const [page,setPage] = useState(1)
    const [sortOrder,setSortOrder] = useState("ASC")

    const navigate = useNavigate()
    const userPerPage = 10
    const lastIndex = page*userPerPage;
    const firstIndex = lastIndex-userPerPage;
   // const currUsers = users.slice(firstIndex,lastIndex);

    const loadData = async () => {
        const res = await fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json')
        const usersdata = await res.json()
        setUsers(usersdata)
    }

    useEffect(()=>{
        setCurrUsers(users.slice(firstIndex,lastIndex))
    },[users,page])
    
    useEffect(()=>{
        loadData();
    },[])

    function ClickHandler(user){
        userdet(user)
        navigate(`${user.id}`)
    }

    function sorting(col){
        console.log(typeof(col))
        if(sortOrder === "ASC"){
            if(col === "age"){
                const sortedUsers = [...currUsers].sort((a,b) =>a[col]-b[col])
                setCurrUsers(sortedUsers)
                setSortOrder("DSC")
            }else{
                const sortedUsers = [...currUsers].sort((a,b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1)
                setCurrUsers(sortedUsers)
                setSortOrder("DSC")
            }
            
        }else if(sortOrder === "DSC"){
            if(col === "age"){
                const sortedUsers = [...currUsers].sort((a,b) =>b[col]-a[col])
                setCurrUsers(sortedUsers)
                setSortOrder("DSC")
            }else{
                const sortedUsers = [...currUsers].sort((a,b) => 
                a[col].toLowerCase() < b[col].toLowerCase() ? 1: -1)
                setCurrUsers(sortedUsers)
                setSortOrder("ASC")
            }
        }
    }
    
    return(
        <div className="container">
        <div className="tablecontainer">
            <table>
                <thead>
                        <th onClick={()=>sorting("first_name")}><div className="sort-symb"><div>First Name</div> <div className="sort-symb-2"><div>&#x25b4;</div> <div>&#x25be;</div></div></div></th>
                        <th onClick={()=>sorting("last_name")}><div className="sort-symb"><div>Last Name</div> <div className="sort-symb-2"><div>&#x25b4;</div> <div>&#x25be;</div></div></div></th>
                        <th onClick={()=>sorting("age")}><div className="sort-symb"><div>Age</div> <div className="sort-symb-2"><div>&#x25b4;</div> <div>&#x25be;</div></div></div></th>
                        <th onClick={()=>sorting("email")}><div className="sort-symb"><div>Email</div> <div className="sort-symb-2"><div>&#x25b4;</div> <div>&#x25be;</div></div></div></th>
                        <th onClick={()=>sorting("web")}><div className="sort-symb"><div>Website</div> <div className="sort-symb-2"><div>&#x25b4;</div> <div>&#x25be;</div></div></div></th>
                </thead>
                <tbody>
                    {
                        currUsers.filter(user => {
                            if(searchText === ""){
                                return user;
                            }else if((user.first_name.toLowerCase().includes(searchText.toLowerCase()))
                            ||(user.last_name.toLowerCase().includes(searchText.toLowerCase()))){
                                return user;
                            }
                        }).map(user => (
                            <tr key={user.id} className="row">
                                <td onClick={()=>ClickHandler(user)}>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td><a target="blank" href={user.web} >{user.web}</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Outlet />
        </div>
         <Pagination totusers = {users.length} usersperpage = {userPerPage} setPage={setPage} page = {page}/>
        </div>
    )
}