import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../src/assets/Certi.json';
import address from '../src/assets/deployed_addresses.json';


function App() {
  const [data, setData] = useState('');

  const [fromData, setFormData] = useState({
    id: 0,
    name: '',
    course: '',
    grade: '',
    date: ''
  })

  // const [output, setOutput] = useState('');

  function handleChange(event) {
    console.log(event.target);
    const { name, value } = event.target;
    console.log(name);
    setFormData((preState) => ({ ...preState, [name]: value }))
    console.log(fromData);
  }

  async function connectToMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress = address['CertModule#Certi'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress, cAbi, signer);
    console.log(certiInstance);
    const txnReceipt = await certiInstance.issueCert(fromData.id,
      fromData.name,
      fromData.course,
      fromData.grade,
      fromData.date);
    console.log(txnReceipt);
  }

  async function getCertificate() {
    const id = document.getElementById('ID').value;
    console.log(id);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress = address['CertModule#Certi'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress, cAbi, signer);
    const txValue = await certiInstance.certificates(id);
    console.log(txValue[0]);
    setData(txValue);
    // setOutput(`Name of Candidate:${txValue[0]} Course:${txValue[1]} Grade:${txValue[2]} Date:${txValue[3]}}`)

  }

  return (
    <div className="min-h-screen flex items-center justify-center space-x-10 bg-gray-900 text-white">

      <div className="shadow-lg p-8 rounded-lg bg-slate-100 max-w-lg mt-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "ID", type: "number", name: "id" },
            { label: "Candidate Name", type: "text", name: "name" },
            { label: "Course", type: "text", name: "course" },
            { label: "Grade", type: "text", name: "grade" },
            { label: "Date", type: "date", name: "date" },
          ].map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label
                htmlFor={field.name}
                className="text-gray-700 font-medium mb-2"
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={fromData[field.name]}
                onChange={handleChange}
                className="shadow-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg uppercase hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      <div>
      <div className="shadow-lg p-8 rounded-lg text-black max-w-lg">
        <button
          onClick={connectToMetamask}
          className="bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg uppercase hover:bg-red-800"
        >
          Connect to MetaMask
        </button>
      </div>

      <div className="shadow-lg p-8 rounded-lg bg-slate-100 max-w-lg mx-auto space-y-4">
        <label htmlFor="ID" className="text-gray-700 font-medium">
          Enter your ID:
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            id="ID"
            name="ID"
            className="shadow-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
          />
          <button
            type="button"
            onClick={getCertificate}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg uppercase hover:bg-green-600"
          >
            Get Certificate
          </button>
        </div>
      </div>
      </div>

      {data && (
        <div className="shadow-lg p-8 rounded-lg bg-white max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Certificate
          </h2>
          <p className="text-gray-700">
            This is to certify that <b>{data.name}</b> has successfully
            completed <b>{data.course}</b> with a grade of <b>{data.grade}</b>{" "}
            on <b>{data.date}</b>.
          </p>
        </div>
      )}
    </div>
  )
}

export default App