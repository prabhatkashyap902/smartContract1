import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { TbLoader2 } from "react-icons/tb";


const Dailog = ({setIsStakeDialogOpen,isStakeDialogOpen, setStakeAmount,handleOnClick,showLoading,setShowLoading,showLoading2,setShowLoading2 }) => {

  return (
	<div className='bg-white py-5 px-5 text-black rounded-md shadow-xl '>
		<div className='flex flex-col'>
			
			<div className='font-extrabold flex justify-between mb-2'>
			{isStakeDialogOpen.type===1?<h1>Approve on behlf of yours!</h1>:<h1>Stack Money</h1>}
			<div className="flex justify-end my-1 cursor-pointer" onClick={e=>{setIsStakeDialogOpen({type:0, open:false}); setShowLoading(false); setShowLoading2(false)}}>
				<IoCloseSharp />

			</div>
			</div>
			<div>
				<input type='text' className='rounded-md py-2 px-4 w-[300px] lg:w-[500px] my-5' 
				placeholder={isStakeDialogOpen.type===1?`Enter the total amount for stake`:`Enter the amount which you want to stake`} onChange={e=> setStakeAmount(e.target.value)}/>
			</div>
			<div className='flex justify-center items-center text-white'>
				
				{isStakeDialogOpen.type===1?
				<>
					<button className={`${showLoading2?' cursor-not-allowed focus:outline-none ':''}  rounded-md bg-green-600 w-full  px-4 py-2 my-1 mx-1`} onClick={e=>handleOnClick(0,true)}>{showLoading2?<div className='flex justify-center animate-spin	'><TbLoader2 /></div>:"Approve"}</button>
					<button className={`${showLoading2?' cursor-not-allowed focus:outline-none ':''}  rounded-md bg-red-500 w-full  px-4 py-2 my-1 mx-1`} onClick={e=>{setIsStakeDialogOpen({type:0, open:false});setShowLoading(false); setShowLoading2(false)}}>Cancel</button>
				</>
				:
				<button className={`${showLoading?' cursor-not-allowed focus:outline-none ':''} w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
					onClick={e=>handleOnClick(0,false)}> {showLoading?<div className='flex justify-center animate-spin	'><TbLoader2 /></div>:"SUBMIT"}</button>}
					{showLoading&&<TbLoader2 />}
			</div>
		</div>
		<div>

		</div>
	</div>
  )
}

export default Dailog