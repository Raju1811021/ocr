import React, { useEffect, useState } from "react";
import styles from '../Assets/css/login.module.css';

import commonStyle from '../Assets/css/common.module.css';

import { NavLink, useNavigate } from "react-router-dom";
import boyImg from "../Assets/imgs/boy-image.png";
import { postJSONData } from "../Services/methods";
import { Loader } from "../Components/loader";

export const Login=()=>{
    const [credentials,setCredentials]=useState({username:"",password:"",cpassword:""});
    const [error,setError]=useState(false);
    const [success,setsuccess]=useState(false);
    const [isLoader,setLoader]=useState(false);

    const [isLoginState,setLoginState]=useState(true);
    const navigate=useNavigate();

    const loginTogle=(e)=>{
        e.preventDefault();
        setLoginState(!isLoginState);
    }

    const handleSumition=async (e)=>{
        if(isLoginState){
            // Handling login
            if(credentials.username.length===0 && credentials.password.length===0){
                setError("Credentials are required !");
                return;
            }
            let data={username:credentials.username,password:credentials.password};

            setLoader(true);
            const res=await postJSONData("api/v1/auth/login/",data,false);
            if (res?.status_code===200){
                localStorage.setItem("uAuth",res?.data?.access)
                navigate("/documents");
                
            }
            setLoader(false);
            setError("Please provide the valid credentials !");

        }
        else{
            // handle sign up
            if(credentials.username.length===0 && credentials.password.length===0 && credentials.cpassword.length===0){
                setError("Credentials are required !");
                return;
            }
            if(credentials.password!==credentials.cpassword){
                setError("Password does not match !");
                return;
            }

            setLoader(true);
            const res=await postJSONData("api/v1/auth/register/",credentials,false);

            if (res?.status_code===200){
                setError(false);
                localStorage.setItem("uAuth",res?.data?.access)
                navigate("/documents");       
            }
            else{
                setError("Username already exist , choose others !");
                setsuccess(false);
            }
            setLoader(false);

        }

    }

    const handleChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setCredentials({...credentials,[name]:value});

    }
    const handleEnter=(event)=>{
        if(event.keyCode === 13){
            handleSumition();
        }
    }

    return(
        <form className={styles.loginform}>
            { isLoader && <Loader/>}
            <p className={styles.signup}>{isLoginState?"Login":"Sign up"}</p>
            <div>
                <label>Username</label>
                <input onChange={handleChange} type="text" name="username" value={credentials.username}/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={handleChange} onKeyDown={handleEnter} type="password" name="password" value={credentials.password}/>
            </div>
            {
                isLoginState?"":(<div>
                    <label>Confirm Password</label>
                    <input type="password" onKeyDown={handleEnter} name="cpassword" value={credentials.cpassword} onChange={handleChange}/>
                </div>)
            }
            <p
             className={commonStyle.submitBtn}
             onClick={handleSumition}
            >{isLoginState?"Login":"Create Account"}</p>

            <div className={styles.loginLink}>
                <span>{isLoginState?"Don't":"Already"} have an account ?</span>
                <NavLink onClick={loginTogle}>{isLoginState?"Create":"Login"}</NavLink>
            </div>
            { error && <p style={{color:"red",textAlign:"center"}}>{error}</p>}
            {success && <p style={{color:"green",textAlign:"center"}}>{success}</p>}
        </form>
    )
};

export const LoginBanner=()=>{
    return(
        <section className={styles.loginBanner}>
            <img src={boyImg} alt="boyimg"/>
        </section>
    )
};

export const LoginRegister=()=>{
    const navigate=useNavigate();
    const token=localStorage.getItem("uAuth");
    useEffect(()=>{
        if(token){
            navigate('/documents')
        }
    },[])

    return(
        <section className={styles.loginCont}>
            <Login/>
            <LoginBanner/>
        </section>
    );
}