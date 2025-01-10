import { Router } from 'express'
import { id, Interface, JsonRpcProvider } from 'ethers'
import account from "../deployed_addresses.json" with {type:"json"};
import ABI from "../Certi.json" with {type:"json"};

const router = Router()

const provider = new JsonRpcProvider('http://127.0.0.1:8545')
const eventTopic = id('Issued(string,uint256,string)')
const iface = new Interface(ABI.abi)

router.get('/', async (req, res) => {
  let eventlogs = []

  BigInt.prototype.toJSON = function () {
    return this.toString()
  }
//   console.log("Hi");
  

  await provider
    .getLogs({
      fromBlock: 'earliest',
      toBlock: 'latest',
      address: account['CertModule#Certi'],
      topics: [eventTopic],
    })
    .then((logs) => {
      logs.forEach((log) => {
        eventlogs.push(iface.parseLog(log))
      })
    })

  res.json(eventlogs)
})

export {router}