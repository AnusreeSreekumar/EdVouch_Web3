import { Router } from "express";
import { ethers } from "ethers";
import address from "../deployed_addresses.json" with {type:"json"};
import ABI from "../Certi.json" with {type:"json"};
import dotenv from "dotenv";

const certRouter = Router();
dotenv.config();
//this is for HardHat node
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const signer = await provider.getSigner();

//this is for Sepolia Test
// const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
// console.log("Sepolia Account: ",signer.address);
const certInstance = new ethers.Contract(address["CertModule#Certi"], ABI.abi,signer )
// console.log(certInstance);


// certRouter.get('/', (req,res) => {
//     res.send('Hello Router in 4000!!!')
// })

certRouter.post('/issueCert', async (req,res) => {

    const data = req.body
    const { id, name, course, grade, date } = data;
    
    console.log(typeof(data.id));
    

    const txnReceipt = await certInstance.issueCert(id, name, course, grade, date);
    console.log(txnReceipt);
    if(txnReceipt){
        res.send(txnReceipt.hash)
    }
    else{
        res.status(404).json({message: 'Your Trasaction failed'})
    }
   
})

certRouter.get('/getCert/:id', async (req,res) => {

    const id = req.params.id;
   
    // const certId = parseInt(id);
    // console.log(typeof(certId));

    const certiData = await certInstance.certificates(id);
    if(certiData){
        res.send(certiData)
    }
    else{
        res.status(404).json({message: 'Not found'}) 
    }
})

export {certRouter}