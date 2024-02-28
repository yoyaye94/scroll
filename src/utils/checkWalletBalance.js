// Import ethers.js library
const { ethers } = require('ethers');

// Function to check the balance of an Ethereum wallet
async function checkWalletBalance(walletAddress, providerUrl) {
    try {
        // Connect to an Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);

        // Get the balance of the wallet
        const balance = await provider.getBalance(walletAddress);

        // Convert balance to Ether
        const etherBalance = ethers.utils.formatEther(balance);

        // Return the balance
        return etherBalance;
    } catch (error) {
        // Handle any errors
        console.error('Error checking wallet balance:', error);
        throw error;
    }
}

// Export the function for use in other modules
module.exports = checkWalletBalance;
