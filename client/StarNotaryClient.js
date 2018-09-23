import { starNotaryAbi, starNotaryContractAddress } from "./constants";
import Web3 from 'web3';
const STAR_PROPS_NAMES = Object.assign({}, ["name", "story", "dec", "mag", "cent"]);

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

class StarNotaryClient {
    constructor() {
        let contract = web3.eth.contract(starNotaryAbi);
        this.contract = contract.at(starNotaryContractAddress);
    }
    
    getAccounts() {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if(error) reject(error);
                else resolve(accounts);
            });
        });
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
                            let id = Number(event.args._tokenId);
                            let star = await this.getStarInfoByTokenId(id);
                            let starObj = star.reduce((obj, starProperty, index) => {
                                obj[STAR_PROPS_NAMES[index]] = starProperty;
                                return obj;
                            }, {id});
                            starsInfo.push(starObj);
                        }
                        resolve(starsInfo);
                    }
                });
            } catch (e) {
                reject("Something went wrong while getting stars");
            }
        });
    }
}

export default new StarNotaryClient();