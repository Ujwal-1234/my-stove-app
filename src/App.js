import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Link, useLocation } from 'react-router-dom';
import Map from './components/Map';
import List from './components/List';
import Search from './components/Search';
import Device from './components/Device';
import Configure from './components/Configure';
import About from './components/About';
import Card from './components/Card';
import { FaMapMarkerAlt, FaThList, FaSistrix } from 'react-icons/fa'
import { MdOutlineSettings } from 'react-icons/md'
import { TbDevicesPlus } from 'react-icons/tb'
import { user_logout } from './components/operations';
import { FcDataConfiguration, FcAbout } from 'react-icons/fc'
import { FiMenu, FiX} from 'react-icons/fi'
import Log from './components/Log';
import pl from './components/pl.png'
import { useCheckSession } from './components/operations';

const App = () => {
  const [result, setResult] = useState([]);
  const [add, setAdd] = useState(true)
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
  const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAdd(false)
      }, 3000);
    }, []);
  const control_panel = ()=>{
      console.log(window.location)
      console.log("control panel")
      // console.log(window.location.pathname)
      window.location.href=`http://localhost:5173?token=${localStorage.getItem('sessionid')}`
  }
  
  useCheckSession()
  
  return (
    add?<div className='w-full min-h-screen bg-slate-900 flex items-center justify-center'>
        <a>
          <img className={`fade-in ${isVisible ? 'visible' : ''}`} src={pl}/>
        </a>
      </div>:<div className={`fade-in ${isVisible ? 'visible' : ''} `}>
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
                        <Link to="/search" className=' text-4xl w-full text-white mt-5 flex items-center justify-center hover:text-5xl hover:cursor-pointer'><FaSistrix/></Link>
                        <p onClick={()=>control_panel()} className=' text-4xl w-full text-white mt-5 flex items-center justify-center hover:text-5xl hover:cursor-pointer'><MdOutlineSettings /></p>
                        <Link to="/adddevice" className=' text-4xl w-full text-white mt-5 flex items-center justify-center hover:text-5xl hover:cursor-pointer'><TbDevicesPlus /></Link>
                        <Link to="/configure" className=' text-4xl w-full text-white mt-5 flex items-center justify-center hover:text-5xl hover:cursor-pointer'><FcDataConfiguration/></Link>
                      </>
                      :
                      <></>
                    }
                    <Link to="/about"><FcAbout className=' text-4xl w-full mt-5 hover:text-5xl hover:cursor-pointer' onClick={()=>{setAbout(!about)}}/></Link>
                    <div className='hidden lg:flex lg:fixed top-10'><input type='submit' onClick={()=>{user_logout()}} className=' lg:w-auto inline hover:cursor-pointer hover:bg-slate-800 hover:text-white border-black bg-slate-300 text-black border p-4 m-2 shadow-2xl shadow-black rounded-xl hover:border-white' value={'logout'}/></div>
                </div>
            </div>
            <div className=' lg:hidden z-50 fixed bottom-0 right-0 p-5'>{menuicon?<FiMenu className=' bg-slate-600 rounded-lg text-5xl' onClick={()=>{setMenuicon(false)}}/>:<FiX className=' bg-slate-600 rounded-lg text-5xl' onClick={()=>{setMenuicon(true)}}/>}</div>
              {
                menuicon?
                <></>
                :
                <div className=' z-50 lg:hidden bottom-20 bg-black p-2 rounded-xl border-2 right-10 fixed'>
                    {mapView?<Link to="/list"><FaMapMarkerAlt onClick={()=>{setMapView(false)}} className=' text-8xl text-white hover:cursor-pointer'/></Link>:<Link to="/map"><FaThList onClick={()=>{setMapView(true)}} className=' text-8xl text-white hover:cursor-pointer'/></Link>}
                    {
                      admin
                      ?
                      <>
                        <Link to="/search" ><FaSistrix className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setSearch(!search)}}/></Link>
                        <MdOutlineSettings className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{control_panel()}} />
                        <Link to="/adddevice" ><TbDevicesPlus className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setDevice(true)}}/></Link>
                        <Link to="/configure" ><FcDataConfiguration className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setConfigure(!configure)}}/></Link>
                      </>
                      :
                      <></>
                    }
                    <Link to="/about"><FcAbout className=' text-8xl text-white hover:cursor-pointer' onClick={()=>{setAbout(!about)}}/></Link>
                    <div className=' flex flex-wrap items-center justify-center'>
                      <input type='submit' className=' flex items-center justify-center text-xl border rounded-sm bg-slate-400 active:bg-slate-900' onClick={()=>{user_logout()}} value={"LOGOUT"}/>
                    </div>
                </div>
              }
          </nav>
        </div>
        <Route path="/list" component={List}/>
        <Route path="/map" component={Map}/>
        <Route path="/search" component={Search}/>
        <Route path="/adddevice" component={Device}/>
        <Route path="/configure" component={Configure}/>
        <Route path="/about" component={About}/>
        <Route path="/card" component={Card}/>
        <Route path="/login" component={Log}/>
      </BrowserRouter>
    </div>
  );
};

export default App;
