// App.js 파일
import { useNavigate } from "react-router-dom"
import '../je.css';
import useWeb3 from '../hooks/useWeb3';
import { useEffect, useState } from 'react';

const useJe = () =>{
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
    const [account, web3] = useWeb3();
    const [isLogin, setIsLogin] = useState(false);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await web3.eth.sendTransaction({
            from: account,
            to: e.target.received.value,
            value: web3.utils.toWei(e.target.amount.value, 'ether'),
        });
    };

    useEffect(() => {

        const init = async () => {
            const balance = await web3?.eth.getBalance(account);
            setBalance(balance / 10 ** 18);
        };

        if (account) setIsLogin(true);
        init();
    }, [account]);

    if (!isLogin)
        return (
            <div>
                <h1>Please use metadata after login.</h1>
            </div>
        );

    return (
        <div className="App">
            <div>
                <h3>{account} wellcome</h3>
                <div>Balance : {balance} ETH</div>
            </div>
            <meta http-equiv="refresh" content="2; url=http://localhost:3000/blackjackjack/index.html" />

        </div>
    );
}

export default useJe;
