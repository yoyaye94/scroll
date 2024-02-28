// Import ethers.js library
const { ethers } = require('ethers');

// Function to generate an Ethereum wallet
async function createEtherWallet() {
    try {
        // Generate a new Ethereum wallet
        const wallet = ethers.Wallet.createRandom();
        
        // Return the wallet object
        return wallet;
    } catch (error) {
        // Handle any errors
        console.error('Error creating Ethereum wallet:', error);
        throw error;
    }
}

// Export the function for use in other modules
module.exports = createEtherWallet;