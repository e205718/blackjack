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
const contract = new web3.eth.Contract(minABI,tokenAddress ,{ from: walletAddress });

// 引数にウォレットのアドレスを渡して、balanceOf 関数を呼ぶ

const handleSubmit = async () => {
  const value = 500/10**18;
  await contract.transfer(toAddress, value, (error, txHash) => {
    // トランザクションを実行するので、戻り値はトランザクションハッシュ
    console.log(txHash);
  });
};
async function pp(){
  let decimals = web3.utils.toBN("18");
  let amount = web3.utils.toBN("100"); //少数が無理？
  let value = amount/web3.utils.toBN(10).pow(decimals);
  const txHash = await contract.methods.transfer(toAddress, value).call();
    // トランザクションを実行するので、戻り値はトランザクションハッシュ
    console.log(txHash);

}
const a = pp();
console.log(a);
return (
  <div className="App">

      <div>
          <form onSubmit={handleSubmit}>
              <input type="submit" value="決定" />
          </form>
      </div>

  </div>
);
}

export default usePog;
