import Web3 from 'web3';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
export const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

ReactDOM.render(<App />, document.getElementById("app"));