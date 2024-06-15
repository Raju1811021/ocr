import React from "react";
import { Routes,Route } from "react-router-dom";
import { Documents } from "../Features/document";
import { LoginRegister } from "../Features/auth";
import { ProtectedRout } from "./protectRoute";


export const UserRoute=()=>{
    
    return(
        <Routes>
            <Route exact index element={<LoginRegister/>}/>
            <Route exact path="login" element={<LoginRegister/>}/>

            {/* Route Protection Required */}
            <Route exact path="documents" element={<ProtectedRout Components={Documents}/>}/>
        </Routes>
    )
};