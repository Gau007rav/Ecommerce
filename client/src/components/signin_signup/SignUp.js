import React, { useState } from 'react'
import "./signUp.css"
import { Divider } from '@mui/material';
import {NavLink} from "react-router-dom"
const SignUp = () => {
    let[udata,setUdata]=useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    })

    let adddata = (e) =>{
        let {name,value}=e.target
        setUdata(()=>{
            return({
                ...udata,
                [name]:value
            })
        })
    }

    let sendData = async(e) =>{
        e.preventDefault();
        let{fname,email,mobile,password,cpassword}=udata;
        let res =  await fetch("http://localhost:7000/register",{
            method:"Post",
            headers:{
                "Content-type":"application/json"

            },
            body:JSON.stringify({
                fname,email,mobile,password,cpassword
            })
        });
        let data = await res.json();
        //console.log(data)
        if(res.status===422 || !data){
            alert("data is not coming ")
        }
        else{
            alert("good to go")
            setUdata({
                ...udata, fname: "", email: "",
                mobile: "", password: "", cpassword: ""
            });
        }
    }
  return (
    <section>
            <div className="sign_container">
                <div className="sign_header">
                <img src="https://flyclipart.com/thumb2/amazon-buy-logo-online-shop-icon-499798.png " style={{width:"87px" }} alt='logo'></img>
                </div>
                <div className="sign_form"method="Post" >
                    <form method="POST">
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input type="text" name="fname"
                                onChange={adddata}
                                value={udata.fname}
                                id="name" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={udata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="number" name="mobile"
                                onChange={adddata}
                                value={udata.mobile}
                                id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={udata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="password" name="cpassword"
                                onChange={adddata}
                                value={udata.cpassword}
                                id="passwordg" />
                        </div>
                        <button type="submit" className="signin_btn"  onClick={sendData}>Continue</button>

                        <Divider />

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
              
            </div>
        </section>
  )
}

export default SignUp