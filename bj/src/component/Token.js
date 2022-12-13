import Web3 from 'web3'
import React, { useState } from 'react';

function pog(){

const Web3 = require('web3');
var currentProvider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(currentProvider);
let tokenAddress = "0xE387cC87AC9ec21A223420A535a6Db30b9989E19";
let walletAddress = "0x1E07f4b714733fC8a8F4D64CBDfE35aE0C9F5978";

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
  }
];

//  ABI とコントラクト（ERC20トークン）のアドレスから、コントラクトのインスタンスを取得
const contract = new web3.eth.Contract(minABI,tokenAddress);

// 引数にウォレットのアドレスを渡して、balanceOf 関数を呼ぶ
const result = contract.methods.balanceOf(walletAddress).call();

 const print = async () => {
   const a = await result;

    console.log(a);
   const bala = a + 1000000;
   console.log(bala);
   return (
     <div>
     <a>  ${bala}</a>

     </div>
   )
}
print();
}
export default pog;
