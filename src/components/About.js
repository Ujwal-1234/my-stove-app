import React from 'react'
import pl from './pl.png'

export default function About() {
  return (
    <div className='fixed lg:w-11/12 w-full min-h-screen h-11/12 flex left-0 items-center justify-center bg-black bg-opacity-20'>
        <p className=' bg-white flex items center justify-center flex-wrap rounded-3xl p-5 w-full lg:w-1/3'>
        <a className='w-full flex items-center justify-center'>
            <img src={pl}/>
        </a>
        <a className=' p-2 lg:w-1/2 w-full block text-center'>
            <span className=' underline'>Address</span> <br/> PLOT NO: D1/20, MIDC Ambad, Nashik, Maharashtra 422010
        </a>
        <a className='lg:w-1/2 w-full block p-2 text-center'>
            <span className='block'> <a className='text-blue-500 underline' href='http://pradnyaconsultant.in'>pradnyaconsultant.in</a></span>
            <span className='block'> <a>Contact : 9975369681</a></span>
            <span className='block'> <a>Email : vipul2012.bumb@gmail.com</a></span>
        </a>
        </p>
    </div>
  )
}
