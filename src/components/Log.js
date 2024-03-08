import React, { useEffect, useRef, useState } from 'react'
import { user_logout } from './operations'
import './an.css'

export default function Log() {
    const [login, setLogin] = useState(false)
    const l_user = useRef()
    const l_pass = useRef()
    const s_email = useRef()
    const s_fullname = useRef()
    const s_phone = useRef()
    const s_password = useRef()
    
    const user_login = () =>{
      const url = 'http://pradnyaconsultant.in:3000/login'
      const data = {
        userid: l_user.current.value,
        password: l_pass.current.value,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      };
      console.log(url)
      fetch(url, options).then((response)=>response.json()).then((actualData)=>{
        console.log(actualData)
        if(!actualData.error)
        {
          if(actualData.message === 'Login successful')
          {
            localStorage.setItem('sessionid', actualData.sessionid)
            localStorage.setItem('admin', actualData.admin)
            {localStorage.getItem('sessionid')?window.location.reload():console.log('Login Failed')}
          }
        }
        else{
          if (actualData.message == 'ER_DUP_ENTRY')
          {
            alert("User already logged in on other device")
            if(window.confirm("Logout from other device")){
              console.log("True")
              user_logout(l_user.current.value)
            }
          }
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }
    const user_signup = () =>{
      const url = 'http://pradnyaconsultant.in:3000/register'
      const data = {
        username: s_fullname.current.value,
        email:s_email.current.value,
        phone:s_phone.current.value,
        password: s_password.current.value,
      };
      console.log(data)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      };
      console.log(url)
      fetch(url, options).then((response)=>response.json()).then((actualData)=>{
        console.log(actualData)
        if(!actualData.error)
        {
          if(actualData.message === 'Login successful')
          {
            sessionStorage.setItem('sessionid', actualData.sessionid)
            sessionStorage.setItem('admin', actualData.admin)
            {localStorage.getItem('sessionid')?window.location.reload():console.log('Login Failed')}
          }
        }
        else{
          if (actualData.message == 'ER_DUP_ENTRY')
          {
            alert("User already logged in on other device")
            if(window.confirm("Logout from other device")){
              console.log("True")
              user_logout(l_user.current.value)
            }
          }
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  return (
    <>
    <div className={`w-full lg:w-11/12 p-10 flex flex-wrap items-center justify-center text-white min-h-screen bg-slate-800`}>
        {login
        ?
        <form className='lg:w-3/4 flex flex-wrap items-center justify-center'>
            <input type='text' ref={s_fullname} className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='FULL NAME'/>
            <input type='text' ref={s_email} className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='EMAIL'/>
            <input type='text' ref={s_phone} className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='PHONE'/>
            <input type='password' ref={s_password} className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='PASSWORD'/>
            <input type='button' className=' w-full lg:w-3/4 p-3 rounded-xl text-2xl m-2 bg-gradient-to-b from-black to-white hover:from-white hover:to-black hover:cursor-pointer text-black text-center' onClick={()=>{user_signup()}} value={"REGISTER"} />
            <a className=' cursor-default w-full flex flex-wrap items-center m-4 justify-center'>Already Registered ? <span className='cursor-pointer underline' onClick={()=>{setLogin(false)}}>Login</span></a>
        </form>
        :
        <form className=' lg:w-3/4 flex flex-wrap items-center justify-center'>
            <input type='text' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' ref={l_user} placeholder='USER ID'/>
            <input type='password' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' ref={l_pass} placeholder='PASSWORD'/>
            <input type='button' className=' w-full lg:w-3/4 p-3 rounded-xl text-2xl m-2 bg-gradient-to-b from-black to-white hover:from-white hover:to-black hover:cursor-pointer text-black text-center' onClick={()=>{user_login()}} value={"LOGIN"}/>
            <a className=' cursor-default w-full flex flex-wrap items-center m-4 justify-center'>New to Us ? <span className='cursor-pointer underline' onClick={()=>{setLogin(true)}}>Create Account</span></a>
        </form>
        }
    </div>
    </>
  )
}
