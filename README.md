# Privacy First Decentralized Storage

Welcome to the **Privacy First Decentralized Storage** platform! This application allows you to encrypt your folders securely on your own device and store their metadata on the Solana blockchain, with the encrypted files themselves hosted on IPFS. 

Because this application is currently deployed on the **Solana Devnet**, you don't need real money to test it out! You can use free "Devnet SOL".

Follow the instructions below to get started.

---

## 🚀 Getting Started

### 1. Install a Solana Wallet
To interact with the app, you need a Solana wallet. We recommend **Phantom**.
- Download and install the [Phantom Browser Extension](https://phantom.app/).
- Pin the extension to your browser toolbar.
- Follow the setup process to create a new wallet. **Make sure to save your secret recovery phrase safely.**

### 2. Switch to Solana Devnet
Since this app runs on the developer network (Devnet), you need to change your Phantom wallet settings:
1. Open the Phantom extension.
2. Click on the **Settings Gear** icon (⚙️) in the top left/bottom right.
3. Go to **Developer Settings**.
4. Turn on the **Testnet Mode** toggle.
5. Ensure **Solana Devnet** is selected as the default network.

### 3. Get Free Devnet SOL (Faucet)
You need Devnet SOL to pay for the tiny transaction fees on the blockchain.
1. Copy your Solana wallet address from the top of the Phantom extension.
2. Go to the official Solana Faucet: [https://faucet.solana.com/](https://faucet.solana.com/)
3. Paste your wallet address.
4. Connect your github.
5. Select **1 SOL** and click **Devnet**.
6. *If the official faucet is down, you can also use [QuickNode Faucet](https://faucet.quicknode.com/solana/devnet).*

Wait a few seconds, and you should see 1 SOL appear in your Phantom wallet!

---

## 💻 Using the Application

### 4. Connect Your Wallet
- Go to the deployed application URL (e.g., provided by Vercel).
- Click the **Connect Wallet** button.
- Phantom will pop up asking for permission to connect to the site. Click **Connect**.

### 5. Initialize Your Storage
*First-time users only:* 
Before you can upload files, you need to create your on-chain storage account.
- Click the **Initialize Storage** button on the dashboard.
- Phantom will ask you to approve a transaction. This transaction creates a unique file registry tied to your wallet address.
- Click **Approve**. (This will cost a tiny fraction of your Devnet SOL).

### 6. Upload a Folder
1. Click on the file selection area to choose a folder from your computer.
2. A browser prompt will pop up asking you to **Enter a name for the folder**. Type your desired name and click OK.
3. The app will automatically zip the folder and encrypt it using a secure AES key.
4. The encrypted file will be uploaded to IPFS.
5. Finally, Phantom will pop up asking you to approve a transaction to save your folder's metadata and encrypted key to the Solana blockchain.
6. Click **Confirm**.

### 7. Retrieve and Download
- Your uploaded folders will appear on your dashboard as File Cards under their assigned names.
- To download a folder, click **Download**. The app will fetch the encrypted file from IPFS, decrypt it using your wallet's secret key, and automatically download the contents in zipped format to your computer.
- To remove a folder from the blockchain registry, click the **Trash/Delete** icon (🗑️) and approve the transaction. 

---

## 🔒 Security & Privacy Notes
- **Zero-Knowledge:** The folder contents are encrypted with AES *before* leaving your computer.
- **Client-Side Encryption:** The AES encryption key itself is encrypted using your Phantom wallet's private signature. Neither IPFS nor Vercel can see your folder contents or decryption keys.
- **Permanent Metadata:** Your metadata (folder name and encrypted keys) is permanently stored on the Solana blockchain and tied exclusively to your wallet address.
- **Pinata IPFS Note (Devnet):** For this Devnet demonstration, encrypted folders are pinned to IPFS using a shared developer Pinata API key for ease of use. In a future Mainnet production release, this upload function would either be routed through a secure backend proxy, or users would provide their own IPFS keys, to ensure complete self-sovereignty and protect developer resources.
