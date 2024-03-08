import React, { useEffect, useState } from 'react'
import fetchData from './api';
import { useLocation } from 'react-router-dom';

export default function Card() {
  const [data, setData] = useState(null)
  const location = useLocation();
  const [table, setTable] = useState("Data Not found")
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const update_location = (serial)=>{
    console.log(serial)
  }
// ###########################################################
  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //     setIsConnected(false);
  //   });
  // }, []);

  // const sendMessage = () => {
  //   socket.emit('message', newMessage);
  //   setNewMessage('');
  // };

// ################################################
  const fetchCardData = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const imeiValue = searchParams.get('imei');
      // console.log('IMEI:', imeiValue);
      const payloadData = {
        sessionid: localStorage.getItem('sessionid'),
        imei : imeiValue
      };
      const result = await fetchData('card', {
        method: 'POST',
        data: payloadData,
      });
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  };
  useEffect(() => {
    if (!data) {
      fetchCardData();
    }
  }, [data]);
  useEffect(() => {
    if (data != null) {
      setTable(data.data[0].table)
      setData(null)
    }
  }, [data]);
  return (
    <div className='stovedata fixed flex flex-wrap bg-white items-center justify-center w-full lg:w-11/12 min-h-screen bg-opacity-90 text-black bg-gradient-to-br from-slate-200 to-slate-600'>
      <p dangerouslySetInnerHTML={{ __html: table }} className='flex flex-wrap items-center bg-gradient-to-tr p-5 from-stone-400 text-white lg:w-1/4 rounded-lg to-blue-950 shadow-black shadow-xl justify-center h-full'></p>
    </div>
  )
}
