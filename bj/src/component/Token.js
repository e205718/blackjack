import Web3 from 'web3'
import { useEffect, useState } from 'react';
import React from 'react';


function usePog(){

const Web3 = require('web3');
var currentProvider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(currentProvider);

let tokenAddress = "0xE387cC87AC9ec21A223420A535a6Db30b9989E19";

let walletAddress = "0x1E07f4b714733fC8a8F4D64CBDfE35aE0C9F5978";
let toAddress = "0xfF8757031Dc4F156d7aaB88290AEA8B1Da7bFD12";
// ERC20 トークンの残高を取得するための最小限のABI
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  },
  // transfer
{
  "constant": false,
  "inputs": [
   {
    "name": "_to",
    "type": "address"
   },
   {
    "name": "_value",
    "type": "uint256"
   }
  ],
  "name": "transfer",
  "outputs": [
   {
    "name": "",
    "type": "bool"
   }
  ],
  "type": "function"
}
];
const [balance, setBalance] = useState(0);
//  ABI とコントラクト（ERC20トークン）のアドレスから、コントラクトのインスタンスを取得
const contract = new web3.eth.Contract(minABI,tokenAddress);

// 引数にウォレットのアドレスを渡して、balanceOf 関数を呼ぶ
useEffect(() => {

 const print = async () => {
   const result = await contract.methods.balanceOf(toAddress).call();
   setBalance(result/10**18);
 };
 print();

},[walletAddress]);
const b = balance + 100000;


const handleSubmit = async () => {
  await contract.methods.transfer(toAddress, 5000/10**18).call();
};


return (
  <div className="App">
      <div>
          <div>Balance : {balance} TOKEN</div>
          <div>Balance : {b} TOKEN</div>
      </div>
      <div>
          <form onSubmit={handleSubmit}>
              <input type="submit" value="決定" />
          </form>
      </div>

  </div>
);
}

export default usePog;
