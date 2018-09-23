import React from "react";
import NoAccount from "./NoAccount";
import NoWeb3Support from "./NoWeb3Support";
import { web3 as web3Instance } from "../index";
import DAppClient from "./DAppClient";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            accounts: []
        }
    }

    async componentDidMount() {

        let acc = await web3Instance.eth.getAccounts();
        if (acc.length >= 1) this.setState(() => ({ accounts: acc }));
        else {
            this.timerId = setInterval(async () => {
                let acc = await web3Instance.eth.getAccounts();
                if (acc.length >= 1) this.setState(() => ({ accounts: acc }));
            });
        }
    }

    render() {
        const { web3 } = window;
        if (!web3) return <NoWeb3Support />;
        else if(this.state.accounts.length < 1) return <NoAccount />;
        else return <DAppClient />

    }

    componentWillUnmount() {
        if(this.timerId) clearInterval(this.timerId);
    }
}

export default App;