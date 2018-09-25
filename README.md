## Decentralized Star Notary Project

This project is part of Blockchain developer nanodegree program from Udacity.
I have built a decentralized star notary service using 
technologies like Ethereum, smart contracts, web3.js etc. in this project.

## Prerequisites/Dependencies

1. Install Node.js. [Check here](https://nodejs.org/en/download/)
2. Once you have node, then install truffle as global dependency.
    by running this command from the terminal
    ```
        npm install -g truffle
    ```
3. You need to have [MetaMask](https://metamask.io/) plugin installed on your browser.
4. Create/Login into your metamask account.
5. In metamask switch to `Rinkeby Test Network`.
6. Have some test ethers loaded into your account. You can do it from [here](https://www.rinkeby.io/#faucet)
7. Play with live demo [here](https://dist-dqnfojhrhx.now.sh/)

## Running the project locally
1. Clone/Download this repository.
2. Browse to root folder of this project and run the following command.
```
npm install
```
3. This project is has two main folder 
    1. `smart_contracts`: which has all the solidity/smart contracts stuff.
    2. `client`: front-end web app to interactor with deployed contract.

4. Start the web client by running the following command from the root folder.
    ```
    npm run start
    ```

5. Goto http://localhost:1234 in your browser and test the app.

6. To test the smart contracts, go to `smart_contracts` folder and run
    ```
    truffle test/StarNotaryTest.js
    ```