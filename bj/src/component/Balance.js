import Web3 from 'web3'
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';

function useBalance(){

const Web3 = require('web3');
var currentProvider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(currentProvider);

const navigate = useNavigate()

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
var accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
    const [balance, setBalance] = useState(0);
    const init = async () => {
    const balance = await web3?.eth.getBalance(accounts);
    setBalance(balance / 10 ** 18);
};
init();
}
export default useBalance;
