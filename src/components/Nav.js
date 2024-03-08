import React, { useState, useRef }  from 'react'
import { FaMapMarkerAlt, FaThList, FaSistrix } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { TbDevicesPlus } from 'react-icons/tb';
import { FcAbout, FcDataConfiguration } from "react-icons/fc";
import { user_logout } from './operations';
import { BrowserRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Nav() {
    const [log, setLog] = useState(false)
    const [mapView, setMapView] = useState(true)
    const [menuicon, setMenuicon] = useState(true)
    const [search, setSearch] = useState(false)
    const [admin, setAdmin] = useState(true)
    const [device, setDevice] = useState(false)
    const [added, setAdded] = useState(false)
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true)
    const [configure, setConfigure] = useState(false)
    const imei = useRef()
    const serial = useRef()
    const simNumber = useRef()
    const [d_name, setDname] =useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [about, setAbout] = useState(false)
    const control_panel = ()=>{
        console.log("control panel")
        window.location.href=`http://localhost:5173?token=${localStorage.getItem('sessionid')}`
    } 
  return (
    <BrowserRouter>
      <div>
        <nav>
          <div className='hidden w-1/12 fixed text-white bg-black min-h-screen right-0 bottom-0 lg:flex lg:flex-wrap items-center justify-center shadow-inner shadow-black bg-gradient-to-br from-gray-800 to-slate-900  p-5'>
            <div className=' flex items-center justify-center flex-wrap'>
                  {mapView?<Link to="/list"><FaMapMarkerAlt onClick={()=>{setMapView(false)}} className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer'/> </Link>:<Link to="/map"><FaThList onClick={()=>{setMapView(true)}} className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer'/></Link>}
                  { 
                    admin
                    ?
                    <>
                      <FaSistrix className=' text-4xl w-full text-white mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{setSearch(!search)}}/>
                      <MdOutlineSettings className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{control_panel()}} />
                      <TbDevicesPlus className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{setDevice(true)}}/>
                      <FcDataConfiguration className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{setConfigure(!configure)}}/>
                    </>
                    :
                    <></>
                  }
                  <FcAbout className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{setAbout(!about)}}/>
                  <div className='hidden lg:flex lg:fixed top-10'><input type='submit' onClick={()=>{user_logout()}} className=' lg:w-auto inline hover:cursor-pointer hover:bg-slate-800 hover:text-white border-black bg-slate-300 text-black border p-4 m-2 shadow-2xl shadow-black rounded-xl hover:border-white' value={'logout'}/></div>
              </div>
          </div>
          <div className=' lg:hidden z-50 fixed bottom-0 right-0 p-5'>{menuicon?<FiMenu className=' bg-slate-600 rounded-lg text-5xl' onClick={()=>{setMenuicon(false)}}/>:<FiX className=' bg-slate-600 rounded-lg text-5xl' onClick={()=>{setMenuicon(true)}}/>}</div>
            {
              menuicon?
              <></>
              :
              <div className=' z-50 lg:hidden bottom-20 bg-black p-2 rounded-xl border-2 right-10 fixed'>
                  {mapView?<FaMapMarkerAlt onClick={()=>{setMapView(false)}} className=' text-8xl text-white hover:cursor-pointer'/>:<FaThList onClick={()=>{setMapView(true)}} className=' text-8xl text-white hover:cursor-pointer'/>}
                  {
                    admin
                    ?
                    <>
                      <FaSistrix className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setSearch(!search)}}/>
                      <MdOutlineSettings className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{control_panel()}} />
                      <TbDevicesPlus className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setDevice(true)}}/>
                      <FcDataConfiguration className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setConfigure(!configure)}}/>
                    </>
                    :
                    <></>
                  }
                  <FcAbout className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setAbout(!about)}}/>
                  <div className=' flex flex-wrap items-center justify-center'>
                    <input type='submit' className=' flex items-center justify-center text-xl border rounded-sm bg-slate-400 active:bg-slate-900' onClick={()=>{user_logout()}} value={"LOGOUT"}/>
                  </div>
              </div>
            }
        </nav>
      </div>
    </BrowserRouter>
  )
}
