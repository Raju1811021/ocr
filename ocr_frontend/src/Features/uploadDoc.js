import React, { useState } from "react";
import styles from '../Assets/css/document.module.css';
import cancelImg from '../Assets/imgs/icons8-cancel-100.png';
import {toast} from 'react-toastify';
import { postFormData } from "../Services/methods";
import { Loader } from "../Components/loader";


export const UploadDocument=({setUpladed,isUploaded,setUpload})=>{
    const [formdata,setFormData]=useState({"doc_type":"","doc_file":false});
    const [isLoader,setLoader]=useState(false);

    const handleChange=(e)=>{
        let name=e.target.name;

        if(name==="doc_type"){
            setFormData({...formdata,["doc_type"]:e.target.value})
        }

        if(name==="doc_file"){
            setFormData({...formdata,["doc_file"]:e.target.files[0]})
        }

        
    }

    const handlePop=()=>{
        setUpload(false)
    }

    const handleFormSubmition=async (e)=>{
        e.preventDefault();

        if(formdata.doc_type.length===0 || formdata.doc_file===false){
            toast.warning("All fields are required !");
            return;
        }
        
        setLoader(true);
        const data = new FormData();
        data.append('doc_type',formdata.doc_type);
        data.append('doc_file',formdata.doc_file);

        const res=await postFormData("api/v1/document/add_document/",data,true);
        if(res?.status_code===200){
            toast.success("Document uploaded successfully.")
            setUpladed(isUploaded+1);
            handlePop();
        }
        else{
            toast.error("Something went wrong , try again !");
        }
        setLoader(false);


    }


    return(
        <>
            {isLoader && <Loader/>}
            <form className={styles.uploadContainer} onSubmit={handleFormSubmition}> 
                <div className={styles.closePop}>
                    <img src={cancelImg} onClick={handlePop} alt="CANCEL"/>
                </div>
                <div>
                    <p>Document Type</p>
                    <input onChange={handleChange} name="doc_type" value={formdata?.doc_type} type="text" placeholder="Exp : Aadhar,Pan"/>
                </div>
                <input type="file" accept="image/*" onChange={handleChange} name="doc_file"/>

                <input type="submit" value="Upload"/>

            </form>
        </>
    );
    
}