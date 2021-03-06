import React from "react";
import ErrorTemplate from "./ErrorTemplate";

const NoWeb3Support = ErrorTemplate.bind(null, {
    title: 'Web3 Not Found',
    message: `
  It seems that you are using a browser without Web3 capabilities. Please
  make sure that you are using a web3-capable browser like mist or parity.
  If you are using MetaMask or Parity extension, make sure that it is
  enabled.
  `
});

export default NoWeb3Support;

