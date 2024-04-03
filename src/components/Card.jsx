import React from 'react'

const Card = ({img,text}) => {
  return (
	<div  className={` w-[300px] rounded-lg flex flex-col mx-2  my-2  lg:w-[500px]  shadow-xl`}>

			
			<div className='font-bold flex justify-center rounded-lg'>
				<img src={img} className='rounded-t-md lg:h-[300px] h-[150px]'/>
			</div>
			
			<div className='flex justify-center bg-green-600 rounded-b-md bottom-0 relative' >
				<button className=' text-white py-1 font-semibold'>{text}</button>
			</div>
	
	</div>
  )
}

export default Card