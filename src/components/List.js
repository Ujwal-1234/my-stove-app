import React, { useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Card from './Card';
import fetchData from './api';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function List() {
  const [viewData, setViewData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(null);
  const [itemList, setItemList] = useState([]);
  const itemsPerPage = 30;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const currentItems = itemList.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchListData = async () => {
    try {
      const payloadData = {
        sessionid: localStorage.getItem('sessionid'),
      };
      const result = await fetchData('list', {
        method: 'POST',
        data: payloadData,
      });
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
      setTimeout(() => {
        if (localStorage.getItem('sessionid') && (localStorage.getItem('sessionid') != undefined || localStorage.getItem('sessionid')!=null)){
          window.location.reload();
        }else{
          window.location.href = '/login'
        }
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchListData();
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    if (!data) {
      fetchListData();
    }
  }, [data]);

  useEffect(() => {
    if (data != null && data.data) {
      const arr = data.data;
      setItemList(arr);
    }
  }, [data]);

  const handleClick = (item) => {
    setViewData(true);
    setSelectedItem(item.imei);
  };
  return (
    <>
      <div className='min-h-screen p-10 shadow-inner h-full shadow-white flex flex-wrap items-center overflow-auto justify-center lg:w-11/12'>
        {currentItems.map((item, index) => (
          <Link to={`/card?imei=${item && item.imei}`}><div
            className="lg:m-5 m-2 border p-5 w-28 lg:w-36 rounded-xl text-white cursor-pointer bg-green-600"
            key={index}
            onClick={() => handleClick(item)}
          >
            {item && item.device_name}
          </div></Link>
        ))}
        <div className='w-full flex flex-wrap justify-center items-center'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious className='text-2xl m-2 inline bg-white' />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNext className='text-2xl m-2 inline bg-white' />
          </button>
        </div>
      </div>
      {/* {viewData && selectedItem && (
        <Card props={selectedItem} id="stdata" />
      )} */}
    </>
  );
}
