# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Notes on codes in App.jsx
***************************

window.ethereum => provider api 
 const provider = new ethers.BrowserProvider(window.ethereum); =>creating an instance of provider which is Metamask. Thru this we are connected to the blockchain network.
 const signer = await provider.getSigner(); =>to get the details of the open accounts, thru which we want to send the transaction.

 const certiInstance = new ethers.Contract(cAddress, cAbi, signer); => creating an instance of the function Contract in ethers library.

 There are two ways to interact with a Smart Contract in Blockchain.
 (1) From Frontend using React => Code available in App.jsx
 (2) From Backend using Express.
