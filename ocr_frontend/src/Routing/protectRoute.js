import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRout=({Components})=>{
    const token=localStorage.getItem("uAuth");
    const navigate=useNavigate();
    useEffect(()=>{
        if(!token){
            navigate("/");
        }

    },[])

    return <Components/>
}