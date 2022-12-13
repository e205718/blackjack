import logo from './logo.svg';
import './App.css';
import './sign.js';
import { useState } from "react"
import Web3 from "web3"
import Routers from './Routers';

  const comp = () => {
  return (
    <div className="App">
      <Routers/>
    </div>
  );
}


function Sign () {
  const [isVerified, setIsVerified] = useState(false)

  const onClick = async () => {
    const provider = window.ethereum || window.web3?.provider || null

    if (!provider) {
      console.error('!provider')
      return
    }

    const web3 = new Web3(provider)
    const [address] = await web3.eth.requestAccounts()

    const message = 'message'
    const password = ''
    const signature = await web3.eth.personal.sign(message, address, password)
    const response = await fetch('src/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({message, address, signature}),
    })

    const body = await response.json()
    setIsVerified(body.isVerified)
  }

  return (
    <>
      <button onClick={onClick}>Sign</button>
      {isVerified && <p>Verified!</p>}
    </>
  )
}

async function apiVerify (req, res) {
  const {message, address: expected, signature} = req.body
  const web3 = new Web3()
  const actual = web3.eth.accounts.recover(message, signature)
  const isVerified = actual === expected

  res.send({isVerified})
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          pppp
        </a>
        <a
        href="./pp.html"
        target="_blank"
        rel="noopener noreferrer"
        >
        PP
        </a>

        <a
        className="TKN"
        href="./sign.js"
        target="_blank"
        rel="noopener noreferrer"
        >
        ぱぴこまる
        </a>

        <a
        className="TKN"
        href="./sign.html"
        target="_blank"
        rel="noopener noreferrer"
        >
        さいんじぇーす
        </a>


        <input type= "button" id="sign" value= "サインイン"/>
        <p>ver6</p>
      </header>
    </div>
  );

}

function startApp(){
  const provider = window.ethereum || window.web3?.provider || null

  if (!provider) {
    console.error('!provider')
    return
  }
    const web3 = new Web3(provider)

    //const [address] = await web3.eth.requestAccounts()

    const ww =  web3.eth.getAccounts(function(error, accounts) {
        if (error) return;
        let user_account = accounts[0];
        if(typeof user_account !== 'undefined'){
            console.log(user_account);
            getBalance(user_account);
            console.log = function (log) {
            document.getElementById('console_log').innerHTML += log + "<br>";
            }

        }else{
            console.log("ログインして下さい");
        }
        return user_account
    });
}
function getBalance(_address){
  const provider = window.ethereum || window.web3?.provider || null

  if (!provider) {
    console.error('!provider')
    return
  }
    const web3 = new Web3(provider)

    web3.eth.getBalance(_address, (error, balance) => {
                 if (error) return;
                console.log(JSON.stringify(balance, null, 2));
            });
}

export default comp;
