import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

const WithdrawDialog = ({totalStackAndReward,unstakeBalance,setShowWithdrawDialog,simpleStakingContract,address}) => {
	const[unstakeAmount,setUnStakeAmount]=useState('')
	const [timeLeft,setTimeLeft]=useState('')

	const handleInitateUnstake=async()=>{
		if (simpleStakingContract && address) {
			try {
			  await simpleStakingContract.methods.initiateUnstake(unstakeAmount).send({ from: address });
			  setUnStakeAmount(0);
			  setShowWithdrawDialog(false);
			  // Fetch updated data after initiating unstake
			} catch (error) {
			  console.error('Error initiating unstake:', error);
			}
		  }
	}
	const handleRedeposit=async()=>{
		if (simpleStakingContract && address) {
			try {
			  await simpleStakingContract.methods.redeposit().send({ from: address });
			  setUnStakeAmount(0);
			  setShowWithdrawDialog(false);
			  // Fetch updated data after initiating unstake
			} catch (error) {
			  console.error('Error initiating unstake:', error);
			}
		  }
	}

	useEffect(()=>{
		const time=new Date().getTime()/1000
		var hours = ((unstakeBalance?.availableFrom?.toString()-time )/ (1000 * 60 * 60));
		console.log(time)
		console.log( unstakeBalance?.availableFrom)
		console.log(hours); 
		setTimeLeft(hours)
	},[])


  return (
	<div className='bg-white text-black rounded-md px-5 py-5 flex justify-center items-center flex-col'>
		<div className='flex justify-between w-full'>
			<div className='bg-gray-800 px-2 py-2 rounded-lg text-white '>
				<div>
					Total Stake - {totalStackAndReward?.stake?.toString()}
				</div>
				<div className='flex flex-col'>
					<span>Unstaking - {unstakeBalance?.amount?.toString()}</span>
					{unstakeBalance?.amount?.toString()!=0&&<span>will be available after {timeLeft} hrs</span>}
				</div>
			
			</div>
			<div>
				<IoCloseSharp  className='cursor-pointer' onClick={e=>setShowWithdrawDialog(false)}/>
			</div>
		</div>
		{unstakeBalance?.amount?.toString()==0&&<div>
			<input type='number' placeholder='Enter Amount which you want to unstake' className='px-3 py-3  rounded-xl '
					onChange={e=>setUnStakeAmount(e.target.value)}  /> 
			<button className='bg-gray-700 text-white rounded px-3 py-3 mx-2 my-5' onClick={handleInitateUnstake}>Initiate Unstake</button>
		</div>}
		{unstakeBalance?.amount?.toString()!=0&&
		<div className='bg-orange-500 text-white my-5 px-5 py-2 rounded-lg'>
			<button onClick={handleRedeposit}>Redeposit</button>
		</div>}
	</div>
  )
}

export default WithdrawDialog