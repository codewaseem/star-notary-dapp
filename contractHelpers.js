class StarNotaryWeb3Interactor {

    constructor(web3, abi, contractAddress) {
        this.web3 = web3;
        let Contract = this.web3.eth.contract(abi);
        this.contract = Contract.at(contractAddress);
    }

    createStar(name, story, dec, mag, cent, tokenId) {
        return new Promise((resolve, reject) => {
            this.contract.createStar(name, story, dec, mag, cent, tokenId, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    onStarCreated(cb) {
        this.contract.Transfer(null, { address: this.web3.eth.accounts[0] }, cb);
    }

    getStarInfoByTokenId(tokenId) {
        return new Promise((resolve, reject) => {
            this.contract.tokenIdToStarInfo(tokenId, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    getAllStarsInfoFor(address) {
        return new Promise((resolve, reject) => {
            try {
                const filter = { fromBlock: 0, toBlock: "latest", address };
                let event = this.contract.Transfer(null, filter);
                event.get(async (error, events) => {
                    if (error) reject(error);
                    else {
                        let starsInfo = [];
                        for (let event of events) {
                            starsInfo.push(await this.getStarInfoByTokenId(Number(event.args._tokenId)));
                        }
                        resolve(starsInfo);
                    }
                });
            } catch(e) {
                reject("Something went wrong while getting stars");
            }
        });
    }


}