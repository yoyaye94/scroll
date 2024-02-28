// Import required libraries
const Web3 = require('web3');
const axios = require('axios');

// Function to bridge tokens from Ethereum to the Scroll network
async function bridgeTokensToScroll(privateKey, scrollAddress, tokenAddress, amount) {
    try {
        // Initialize Web3 instance with Scroll's RPC endpoint
        const web3 = new Web3('https://rpc.scroll.io/');
        
        // Get contract ABI from Scrollscan API
        const abiResponse = await axios.get(`https://api.scrollscan.com/api?module=contract&action=getabi&address=${tokenAddress}&apikey=19NVHJ83RRZVAGI8MV2AB4MIUBFBHATG45`);
        const abi = JSON.parse(abiResponse.data.result);
        
        // Initialize contract instance with ABI and contract address
        const contract = new web3.eth.Contract(abi, tokenAddress);
        
        // Load Ethereum wallet from private key
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(wallet);
        
        // Get gas price and estimate gas limit
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await contract.methods.transfer(scrollAddress, web3.utils.toWei(amount.toString(), 'ether')).estimateGas({ from: wallet.address });
        
        // Send transaction to transfer tokens to Scroll address
        const tx = await contract.methods.transfer(scrollAddress, web3.utils.toWei(amount.toString(), 'ether')).send({
            from: wallet.address,
            gasPrice: gasPrice,
            gas: gasEstimate
        });

        // Wait for transaction confirmation
        await tx.transactionHash;

        // Return success message or other relevant data
        return "Tokens bridged successfully to Scroll network";
    } catch (error) {
        // Handle any errors
        console.error('Error bridging tokens to Scroll network:', error);
        throw error;
    }
}

// Export the function for use in other modules
module.exports = bridgeTokensToScroll;
