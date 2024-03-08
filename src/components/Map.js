import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fetchData from './api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Errorbox from './Errorbox';

const Map = () => {
  const [stoveMap, setStoveMap] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [markers, setMarkers] = useState({});
  const history = useHistory();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const fetchMapData = async () => {
    try {
      const payloadData = {
        sessionid: localStorage.getItem('sessionid'),
        admin: "1"
      };
      const result = await fetchData('getStove', {
        method: 'POST',
        data: payloadData,
      });
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const initializeMap = () => {
    if (stoveMap === null && data !== null) {
      const map = L.map('StoveMap').setView([20.5937, 78.9629], 5);
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
      tiles.addTo(map);
      setStoveMap(map);
    }
  };
  const renderMarkers = () => {
    if (stoveMap !== null && data !== null) {
      const updatedMarkers = {};
      data.data.forEach(item => {
        if (item.latitude !== undefined) {
          let stoveIcon;
          if (item.status === 1 || item.status === '1') {
            stoveIcon = L.icon({
              iconUrl: process.env.PUBLIC_URL + '/StoveIconOn.png',
              iconSize: [40, 40],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            });
          } else if (item.status === 0 || item.status === '0') {
            stoveIcon = L.icon({
              iconUrl: process.env.PUBLIC_URL + '/StoveIconOff.png',
              iconSize: [40, 40],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            });
          }
          const marker = L.marker([item.latitude, item.longitude], {
            icon: stoveIcon,
          }).addTo(stoveMap);
          marker.on('click', () => {
            if (item.imei != undefined){
              history.push(`/card?imei=${item && item.imei}`);
            }
            else{
              alert(`The Device${item.device_name} is Not Started Yet`)
            }
          });
          updatedMarkers[item.serialNumber] = marker;
        }
      });
      setMarkers(updatedMarkers);
    }
  };
  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchMapData();
    }, 5000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  useEffect(() => {
    if (!data) {
      fetchMapData();
    }
  }, [data]);
  initializeMap()
  useEffect(() => {
    if (data != null) {
      renderMarkers();
    }
  }, [data]);
  return (
    <div id="StoveMap" className='z-40 lg:w-11/12' style={{ height: '100vh' }} />
  );
};
export default Map;