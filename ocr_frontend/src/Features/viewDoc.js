import React from "react";
import styles from '../Assets/css/document.module.css';
import cancelImg from '../Assets/imgs/icons8-cancel-100.png';
import boyImg from '../Assets/imgs/boy-image.png';
const BaseURL=process.env.REACT_APP_API_URL;

export const ViewDoc=({setView,currDoc})=>{
    const handlePop=()=>{
        setView(false)
    }
    return(
        <div className={styles.viewDocCont}>
            <div className={styles.closePop}>
                <img src={cancelImg} onClick={handlePop} alt="CANCEL"/>
            </div>
            <p>UID : {currDoc?.uid}</p>
            <div className={styles.extractCont}>
                <img src={`${BaseURL}/${currDoc?.doc_file}`} alt="Data"/>
               
                <div>
                    <div className={styles.extractTitle}>Extracted Text</div>
                    <div className={styles.exrtactionData}>
                        {
                            currDoc?.extraction_data?.split("\n")?.map((value,index)=>{
                                return <div key={index}>{value}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}