import React from 'react'

function Requirement() {
  return (
    <div className=' w-[90%]  z-[9999] relative top-[-100px] h-[300px] bg-[#013A12] border-[1px] border-transparent rounded-2xl flex flex-col items-center gap-10 md:gap-0  justify-center md:justify-start md:flex-row'>
        <div className=' flex  items-center justify-center  w-full'>
            <div className=' w-[90%] gap-5 md:gap-0 flex flex-col'>
            <p className=' macan text-xl md:text-2xl md:text-start text-center text-white'>We are here to help you!</p>
            <h1 className=' macan text-2xl md:text-5xl text-center md:text-start md:leading-[67px] text-white leading-5 text-[500]'  >Tell us what you need, and we{"'"}ll help you get quotes</h1>
            </div>
        </div>
        <div className='w-[60%] flex justify-center items-center'>
            <button className=' w-full md:w-[60%] h-[50px] flex justify-center items-center helve text-white bg-[#148444] border-[1px] border-transparent rounded-[10px]  font-[600]' style={{lineHeight:"16px"}}>Submit Your Requirement</button>
        </div>
    </div>
  )
}

export default Requirement