import React, { useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import Errorbox from './Errorbox';
export default function Configure() {
    const user_name = useRef()
    const serial_number = useRef()
    const sim_number = useRef()
    const location = useRef()
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    const imei = useRef()
    const region = useRef()
    const [error, setError] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelection = (event) => {
      setSelectedOption(event.target.value);
    };
    const call_api = ()=>{
        const postData = {
            user_name:user_name.current.value,
            serial_number:serial_number.current.value,
            imei:imei.current.value,
            sim_number:sim_number.current.value,
            location:location.current.value,
            region:region.current.value,
            devicetype:selectedOption,
            sessionid:localStorage.getItem('sessionid')
        }
        console.log(JSON.stringify(postData))
        const url = 'http://pradnyaconsultant.in:3000/configureUser'
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(postData),
          };
          console.log(url)
          fetch(url, options).then((response)=>response.json()).then((actualData)=>{
            console.log(actualData)
            if (actualData.error && actualData.error!=undefined){
              window.alert(actualData.error)
            }else if(!actualData.error)
            {
              console.log(actualData)
              if(actualData.result && actualData.result === 'success')
              {
                console.log("User Profile Updated")
                
                window.alert("User Profile Updated")
              }
            }
          }).catch((err)=>{
            console.log(err.message)
          })
    }
    const user_configure=()=>{
        window.confirm("confirm with the Details")?(call_api()):console.log("change the contents")
    }
  return (
    <div className='fixed lg:w-11/12 w-full min-h-screen h-11/12 flex left-0 items-center justify-center bg-black bg-opacity-20'>
      {/* {error?<Errorbox onClick={isOpen} onClose={togglePopup}>Failed to Insert Data</Errorbox>:<></>} */}
        <div className=' lg:w-1/6 w-full flex flex-wrap items-center justify-center'>
            <input type='text' placeholder='USER NAME' ref={user_name} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <input type='text' placeholder='Serial number' ref={serial_number} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <input type='text' placeholder='IMEI' ref={imei} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <input type='text' placeholder='SIM number' ref={sim_number} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <input type='text' placeholder='Location' ref={location} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <input type='text' placeholder='Region' ref={region} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
            <select className='lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl' value={selectedOption} onChange={handleSelection}>
                <option value="">Select an option</option>
                <option value="STOVE">STOVE</option>
                <option value="BIOGASS">BIOGASS</option>
            </select>
            <p className='lg:w-auto inline border-black bg-slate-300 text-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'>{selectedOption}</p>
            <a onClick={()=>{user_configure()}} className=' lg:w-auto inline hover:cursor-pointer hover:bg-slate-800 hover:text-white border-black bg-slate-300 text-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'>
              <IoIosSend className='inline' /> submit 
            </a>
        </div>
    </div>
  )
}
