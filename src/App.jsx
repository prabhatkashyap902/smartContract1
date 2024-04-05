import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount,useWalletClient,usePublicClient } from 'wagmi';
import Card from './components/Card'
import Web3 from 'web3';

import './index.css'
import imgDeposit from './assets/money_deposit.jpg'
import imgWithdraw from './assets/money_withdraw.jpg'
import Dailog from './components/Dailog';
import { stakingContractABI, stakingContractAddress, tokenContractABI, tokenContractAddress } from './utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithdrawDialog from './components/WithdrawDialog';


function App() {
	const [web3, setWeb3] = useState(null);
	const [tokenContract, setTokenContract] = useState(null);
	const [simpleStakingContract, setSimpleStakingContract] = useState(null);

	const { isConnected, address } = useAccount()
	const [totalStackAndReward,setTotalStackAndReward]=useState({reward:0,stake:0})
	const [stakeAmount, setStakeAmount] = useState('');
	const [isStakeDialogOpen, setIsStakeDialogOpen] = useState({open:false,type:0});
	const[showLoading,setShowLoading]=useState(false)
	const[showLoading2, setShowLoading2]=useState(false)
	const [showWithdrawDialog,setShowWithdrawDialog]=useState(false);
	const[unstakeBalance,setUnstakeBalance] =useState('')
	const provider = usePublicClient();
	const { data: walletClient  } = useWalletClient();

	const handleOnClick=async (type,approval)=>{
		console.log(stakeAmount,typeof stakeAmount)
		setShowLoading(true)
		if(type===0){
			if(approval){
				
				if (stakeAmount.trim()!=='') {
					setShowLoading2(true)
					// Approve the SimpleStaking contract to spend tokens
					  
					  const gasPrice = await web3.eth.getGasPrice(); // Get current gas price
					  
					  await tokenContract.methods
						.approve(stakingContractAddress, stakeAmount)
						.send({
						  from: address,
						  gas: 200000,
						  gasPrice: gasPrice,
						})
						.on('transactionHash', (hash) => {
						  console.log('Transaction hash:', hash);
						})
						.on('receipt', (receipt) => {
						  console.log('Transaction receipt:', receipt);
						})
						.on('error', (error) => {
						  console.error('Error:', error);
						});
						const notify = () => toast("Approval Done! Now you can stake");
						notify();
			
					setIsStakeDialogOpen({type:0, open:false});
					setShowLoading(false)
					setShowLoading2(false)

					
				  } 
				  else {
					// If the user cancels the approval, exit the function
					console.log('Staking process canceled due to insufficient approval.');
					setShowLoading(false)

					return;
				  }
			}
			else{
				if (simpleStakingContract && tokenContract && address&&stakeAmount.trim()!=='') {
					try {
						// Check if the contract is approved to spend the user's tokens
						const allowance = await tokenContract.methods
						  .allowance(address, stakingContractAddress)
						  .call();
					
						// If allowance is not enough
						if (allowance < stakeAmount) {
						  // Prompt the user to approve the staking contract
						  setIsStakeDialogOpen({type:1, open:true});
	
						  const shouldApprove = confirm(
							`You need to approve the staking contract to spend ${stakeAmount} tokens on your behalf. Do you want to proceed with the approval?`
						  );
							if(!shouldApprove) { setIsStakeDialogOpen({type:0, open:false}); setShowLoading(false)}
						  // If the user approves
						  
						} else {
						  // If allowance is enough, stake the tokens directly
						  await simpleStakingContract.methods
							.stake(stakeAmount)
							.send({
							  from: address,
							  gas: 200000, // Adjust this value based on your requirements
							  gasPrice: await web3.eth.getGasPrice(), // Get the current gas price
							});
					
						  setIsStakeDialogOpen({...isStakeDialogOpen, open:false});
						  setStakeAmount(0);
						  setShowLoading(false)
						}
					  } catch (error) {
					  console.error('Error staking tokens:', error);
					  setShowLoading(false)

					}
				  }
			}
			

		}
		if(type===1){
			

		}
		
	}

	useEffect( ()=>{
		if (provider && walletClient ) {
			const web3Instance = new Web3(walletClient);
			setWeb3(web3Instance);
			const tokenContractInstance = new web3Instance.eth.Contract(tokenContractABI, tokenContractAddress);
			setTokenContract(tokenContractInstance);
			const simpleStakingContractInstance = new web3Instance.eth.Contract(stakingContractABI, stakingContractAddress);
			setSimpleStakingContract(simpleStakingContractInstance);
			const fetchTotalStaked = async () => {
				try {
				  const totalStakedValue = await simpleStakingContractInstance.methods.getTotalStaked().call();
				  setTotalStackAndReward({ stake: totalStakedValue });
				} catch (error) {
				  console.error('Error fetching total staked:', error);
				}
			  };
		  
			  const fetchRewardBalance = async (account) => {
				try {
				  const rewardBalanceValue = await simpleStakingContractInstance.methods.getRewardBalance(account).call();
				  setTotalStackAndReward((prevState) => ({ ...prevState, reward: rewardBalanceValue }));
				} catch (error) {
				  console.error('Error fetching reward balance:', error);
				}
			  };
			  const fetchUnstakedBalance = async () => {
				try {
				  const unstakedBalanceValue = await simpleStakingContractInstance.methods.getUnstakingDetails(address).call();
				//   console.log(unstakedBalanceValue.amount)
				  setUnstakeBalance(unstakedBalanceValue);
				} catch (error) {
				  console.error('Error fetching unstaked balance:', error);
				}
			  };
			  fetchUnstakedBalance()
			  fetchTotalStaked();
			  fetchRewardBalance(address);

			
		}
	},[provider, walletClient,address,showLoading])

	


	if (isConnected) {
		return (
			<div className=' flex justify-between text-white w-full relative h-[100vh] bg-gradient-to-l from-slate-800 to-gray-600 '>
				{/* <h1>Connected Wallet</h1>
				<p>Account Address: {address}</p> */}
				{/* Add more components and functionality */}

				{isStakeDialogOpen.open&&<div className='z-[2] absolute backdrop-blur-md flex justify-center items-center w-full h-full'>
					<Dailog isStakeDialogOpen={isStakeDialogOpen} setIsStakeDialogOpen={setIsStakeDialogOpen}  setStakeAmount={setStakeAmount}
					 handleOnClick={handleOnClick} showLoading={showLoading} setShowLoading={setShowLoading}
					 setShowLoading2={setShowLoading2} showLoading2={showLoading2}
					 />
				</div>}

				{
					showWithdrawDialog&&
					<div className='z-[2] absolute backdrop-blur-md flex justify-center items-center w-full h-full'>
				  
						<WithdrawDialog totalStackAndReward={totalStackAndReward} unstakeBalance={unstakeBalance} 
							setShowWithdrawDialog={setShowWithdrawDialog} simpleStakingContract={simpleStakingContract} address={address}/>
					</div>
				}

				<ToastContainer />
				<div className='flex-col flex  w-full	lg:mx-[100px] relative  items-center h-full my-10'>
					<div><ConnectButton/></div>
					<div className='flex flex-col lg:flex-row justify-between items-center w-full  my-10'>
						<Card img={imgDeposit} text={"Stake Money"} isStakeDialogOpen={isStakeDialogOpen} 
								setIsStakeDialogOpen={setIsStakeDialogOpen} type={0}/>
						<Card img={imgWithdraw} text={"Withdraw Money"}  showWithdrawDialog={showWithdrawDialog} 
								setShowWithdrawDialog={setShowWithdrawDialog}  type={1}/>
					</div>
					<div className='flex'>
					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Total Staked  - {totalStackAndReward?.stake?.toString()}
						</span>
					</button>
					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Reward - {totalStackAndReward?.reward?.toString()}
						</span>
					</button>
					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						unstaked - {unstakeBalance?.amount?.toString()}
						</span>
					</button>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div
			
			className='flex flex-col text-white justify-center items-center w-full h-[100vh] bg-gradient-to-l from-slate-800 to-gray-600 '
		>
			
			<ConnectButton />
			<p className='py-5'>A new way to connect your wallet!</p>
			
		</div>
	);
}

export default App;
