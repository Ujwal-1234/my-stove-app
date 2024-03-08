import React, { useState, useRef} from 'react'
import { FiX } from "react-icons/fi";
import { BiSolidAddToQueue } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'


export default function Device() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [device, setDevice] = useState(false)
    const [added, setAdded] = useState(false)
    const [token, setToken] = useState('')
    const imei = useRef()
    const serial = useRef()
    const simNumber = useRef()
    const handleSelection = (event) => {
        setSelectedOption(event.target.value);
    };
    const add_device =()=>{
        if(imei.current.value === '' || serial.current.value === '' || simNumber.current.value === '')
        {
          console.log('error')
          alert("Kindly Fill all Fields")
        }else{
          console.log(serial.current.value, imei.current.value, simNumber.current.value)
          const url = 'http://pradnyaconsultant.in:3000/newdevice'
          const data = {
            imei: imei.current.value,
            serial: serial.current.value,
            sim: simNumber.current.value,
            devicetype:selectedOption,
            sessionid:localStorage.getItem('sessionid'),
            admin:sessionStorage.getItem('admin')
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
              console.log(actualData)
              if(actualData.result && actualData.result === 'success')
              {
                setAdded(true)
                setToken(actualData.token)
                console.log("device added")
              }
            }
          }).catch((err)=>{
            console.log(err.message)
          })
        }
    }
    return (
        <div className=' w-full lg:w-11/12 fixed left-0 flex items-center justify-center min-h-screen'>
            <div className=' fixed bg-slate-700 shadow-2xl flex flex-wrap shadow-black rounded-md p-10 text-black'>
            {
                added
                ?
                <>
                <div className='w-full flex flex-wrap items-center m-5 justify-center'>
                    <span className='text-white text-2xl'>Device Added Successfully</span>
                    <TiTick className=' w-full  text-8xl text-green-500'/>
                    <p className=' text-white text-xl'>
                    {`Token Generated : ${token}`}
                    <span className='  w-full flex p-4 items-center justify-center'>
                        <input type='button' onClick={()=>{setAdded(false)}} className=' bg-green-500  pr-2 pl-2 hover:text-3xl hover:cursor-pointer shadow-lg shadow-black rounded-lg text-2xl' value={"OK"}/>
                    </span>
                    </p>
                </div>
                </>
                :
                <>
                <input type='text' placeholder='IMEI number' ref={imei} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                <input type='text' placeholder='Serial number' ref={serial} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                <input type='text' placeholder='SIM number' ref={simNumber} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                <select className='lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl' value={selectedOption} onChange={handleSelection}>
                    <option value="">Select an option</option>
                    <option value="STOVE">STOVE</option>
                    <option value="BIOGASS">BIOGASS</option>
                </select>
                <p className='lg:w-auto w-full text-white border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'>{selectedOption}</p>
                <BiSolidAddToQueue onClick={()=>{add_device()}} className=' text-white text-5xl inline-block m-4 shadow shadow-black hover:cursor-pointer hover:shadow-white hover:bg-black'/>
                </>
            }
            </div>
        </div>
    )
}
