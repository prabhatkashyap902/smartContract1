import React from 'react'

const Card = ({img,text,setIsStakeDialogOpen,isStakeDialogOpen}) => {
  return (
	<div  className={` w-[300px] rounded-lg flex flex-col mx-2  my-2  lg:w-[500px]  shadow-xl`} >

			
			<div className='font-bold flex justify-center rounded-lg lg:h-[300px] h-[150px]'>
				<img src={img} className='rounded-t-md  object-fill'/>
			</div>
			
			<div className='flex justify-center   rounded-b-md bottom-0 relative cursor-pointer w-full' onClick={ e=>setIsStakeDialogOpen({...isStakeDialogOpen, open:true})}>
				<button className='w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-b-lg text-sm  py-2.5 text-center  '>{text}</button>
			</div>
	
	</div>
  )
}

export default Card