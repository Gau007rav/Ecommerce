import React, { useState} from 'react'
import "./signUp.css"
import {NavLink} from "react-router-dom"
//import axios from "axios"
const Sign_in = () => {
   // const { account, setAccount } = useContext(Logincontext);
    let[logdata,setData]=useState({
        email:"",
        password:""
    })

    let adddata = (e) =>{
        let{name,value}=e.target
        setData(()=>{
            return({
                ...logdata,
                [name]:value
            })
        })
    }

    let senddata = async (e) => {
        e.preventDefault();

        let  { email, password } = logdata;
       // console.log(email);
        try {
            let res = await fetch("http://localhost:7000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            });


            let data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                //alert("Invalid Details 👎!")
                    

            } else {
                //setAccount(data);
                
                setData({ ...logdata, email: "", password: "" })
                alert("Login Successfully done 😃!")
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    };
  return (
    <section>
    <div className="sign_container">
        <div className="sign_header">
        <img src="https://flyclipart.com/thumb2/amazon-buy-logo-online-shop-icon-499798.png " style={{width:"87px" }} alt='logo'></img>
        </div>
        <div className="sign_form">
            <form method="POST">
                <h1>Sign-In</h1>

                <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                        onChange={adddata}
                        value={logdata.email}
                        id="email" />
                </div>
                <div className="form_data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        onChange={adddata}
                        value={logdata.password}
                        id="password" placeholder="At least 6 characters" />
                </div>
                <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
            </form>
          
        </div>
        <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <button>  <NavLink to="/register">Create your Amazon Account</NavLink></button>
        </div>
    </div>

</section>
  )
}

export default Sign_in