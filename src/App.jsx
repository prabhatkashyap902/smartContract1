import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import Card from './components/Card'
import './index.css'
import imgDeposit from './assets/money_deposit.jpg'
import imgWithdraw from './assets/money_withdraw.jpg'


function App() {
	const { isConnected, address } = useAccount()

	const handleOnClick=()=>{
		
	}

	useEffect(()=>{
	},[])

	if (isConnected) {
		return (
			<div className=' flex justify-between text-white w-full relative h-[100%] top-10'>
				{/* <h1>Connected Wallet</h1>
				<p>Account Address: {address}</p> */}
				{/* Add more components and functionality */}
				<div className='flex-col flex justify-between w-full	lg:mx-[100px] my-2 relative  items-center h-full'>
					<div><ConnectButton/></div>
					<div className='flex flex-col lg:flex-row justify-between items-center w-full my-10'>
						<Card img={imgDeposit} text={"Stack Money"} onClick={handleOnClick}/>
						<Card img={imgWithdraw} text={"Withdraw Money"}  onClick={handleOnClick}/>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				padding: 12,
			}}
		>
		 
			<ConnectButton />
		</div>
	);
}

export default App;
