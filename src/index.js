// Import the createEtherWallet and checkWalletBalance functions
const createEtherWallet = require('./utils/createEtherWallet');
const checkWalletBalance = require('./utils/checkWalletBalance');

// Import the providerUrl from config.js
const { providerUrl } = require('./config');

// Main function to execute the script
async function main() {
    try {
        // Create a new Ethereum wallet
        const wallet = await createEtherWallet();
        console.log('New Ethereum Wallet Created:');
        console.log('Address:', wallet.address);
        console.log('Private Key:', wallet.privateKey);

        // Check the balance of the wallet
        const balance = await checkWalletBalance(wallet.address, providerUrl);
        console.log('Wallet Balance:', balance, 'ETH');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Execute the main function
main();
