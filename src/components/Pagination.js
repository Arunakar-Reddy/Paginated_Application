import React, { useState } from "react";

export default function Pagination({totusers,usersperpage,setPage,page}){
    const [startInd,setStartInd] = useState(0)
    const [endInd,setEndInd] = useState(5)

    const pageNumbers = []

    for(let i=1;i<=totusers/usersperpage;i++){
        pageNumbers.push(i);
    }

    let currPageNums = pageNumbers.slice(startInd,endInd)

    function nexthandleClick(){
        if((startInd+1 !==page)&&(pageNumbers.length-1>endInd)){
            setStartInd(prevInd => prevInd+1)
            setEndInd(prevInd => prevInd+1)
        }
    }

    function prevhandleClick(){
        if((endInd !==page)&&(startInd>0)){
            setStartInd(prevInd => prevInd-1)
            setEndInd(prevInd => prevInd-1)
        }
    }

    return(
        <div className="pagination-outer">
        <div className="pagination">
            <button onClick={prevhandleClick} className="normal">&lt;</button>
            {
                currPageNums.map(num => (
                    <button className={num === page ? "activePage" : "normal"} key={num} onClick={()=>setPage(num)}>{num}</button>
                ))
            }
            <button className="normal" onClick = {nexthandleClick}>&gt;</button>
        </div>
        </div>
    )
}