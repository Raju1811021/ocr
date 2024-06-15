import React, { useEffect, useState } from "react";
import styles from '../Assets/css/document.module.css';
import viewIcon from '../Assets/imgs/icons8-eye-100.png';
import { UploadDocument } from "./uploadDoc";
import { ViewDoc } from "./viewDoc";
import {postJSONData} from '../Services/methods.js';
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "../Components/loader";
import logoutImg from '../Assets/imgs/icons8-logout-100.png';

const BaseURL=process.env.REACT_APP_API_URL;

export const Documents=()=>{
    const [displayUpload,setUpload]=useState(false);
    const [displayView,setView]=useState(false);
    const [documents,setDocuments]=useState([]);
    const [currDoc,setCurrDoc]=useState();
    const [isUploaded,setUpladed]=useState(1);
    const [isLoader,setLoader]=useState(false);
    const navigate=useNavigate();

    const handleView=(data)=>{
        setView(true)
        setCurrDoc(data)
    }

    const handleLogout=()=>{
        localStorage.removeItem("uAuth");
        navigate("/")
    }

    useEffect(()=>{
        (
            async ()=>{
                setLoader(true);
                const res=await postJSONData('api/v1/document/list_documents/',{},true);
                if(res?.status_code===200){
                    setDocuments(res?.data?.reverse())
                }
                setLoader(false);


            }
        )()

    },[isUploaded])

    return(
        <section className={styles.documentCont}>
            {isLoader && <Loader/>}
            {displayUpload && <UploadDocument setUpladed={setUpladed} isUploaded={isUploaded} setUpload={setUpload}/>}
            {displayView && <ViewDoc setView={setView} currDoc={currDoc}/>}

            <div className={styles.documentHead}>
                <b>Optical Character Recognition</b>
                <div className={styles.docb}>
                    <button onClick={()=>{setUpload(true)}}>UPLOAD</button>
                    <img onClick={handleLogout} src={logoutImg}  alt="Logout"/>
                </div>
            </div>

            <div className={styles.docList}>
                <div className={styles.docListHeader}> 
                    <p>ID</p>
                    <p>DATE</p>
                    <p>TYPE</p>
                    <p>DOCUMENT</p>
                    <p>ACTIONS</p>
                </div>

                {
                    documents?.map((value,index)=>{
                        return (
                            <div className={styles.docListRow} key={index}> 
                                <p>{index+1}</p>
                                <p>{new Date(value?.created_date).toLocaleDateString()}</p>
                                <p>{value?.doc_type}</p>
                                <p><NavLink target="_blank" to={`${BaseURL}/${value?.doc_file}`}>{(value?.doc_file?.split("/")[3])?.slice(0,25)}....</NavLink></p>
                                <p>
                                    <img src={viewIcon} onClick={()=>handleView(value)} alt="VIEW"/>
                                </p>
                            </div>
                        )
                    })
                }

            </div>

        </section>
    );

}