import React from "react";
import loaderGIF from "../Assets/imgs/loader.gif";

export const Loader=()=>{
    const customStyle={
        backgroundColor:"#00000066",
        zIndex:"999",
        position:"fixed",
        left:"0px",
        top:"0px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100vw",
        height:"100vh",
        backdropFilter: "blur(10px)"
    }

    return(
        <div style={customStyle}>
            <img src={loaderGIF} width="150px" alt="...."/>
        </div>
    );
}