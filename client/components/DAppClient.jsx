import React from "react";
import starNotaryClient from "../StarNotaryClient";
import StarCard from "./StarCard";


class DAppClient extends React.Component {
    constructor() {
        super();
        this.state = {
            allStars: [],
            ownerStars: [],
            addForm: {
                name: "",
                story: "",
                dec: "",
                mag: "",
                cent: ""
            }
        }
    }

    onChange(e) {
        let key = e.target.name;
        let value = e.target.value;

        this.setState((prevState) => {
            return {
                addForm: Object.assign({}, prevState.addForm, { [key]: value })
            }
        });
    }

    async getStarsInfo() {
        let ownerStars = await starNotaryClient.getAllStarsOfOwner();
        let allStars = await starNotaryClient.getAllStarsInBlockChain();
        this.setState(() => ({ ownerStars, allStars }));
    }
    async componentDidMount() {
        this.getStarsInfo();
    }

    async addStar(e) {
        e.preventDefault();
        const { name, story, dec, mag, cent } = this.state.addForm;
        if (name && story && dec && mag && cent) {
            let tokenId = Date.now();
            let tx = await starNotaryClient.createStar(name, story, dec, mag, cent, tokenId);
            this.txWatchId = setInterval(async () => {
                let txReciept = await starNotaryClient.getTransactionReceipt(tx);
                if (txReciept) {
                    clearInterval(this.txWatchId);
                    if (txReciept.status == "0x1") {
                        alert("Transaction success. Page will be reloaded to reflect changes in the UI");
                        location.reload();
                    } else if (txReciept.status == "0x0") {
                        alert("Something went wrong");
                    }
                }
            }, 1000);
            alert("You will be alerted soon when transaction gets completed")

        } else {
            alert("Please fill all the details");
        }
    }

    render() {
        return (
            <div className="dapp">
                <h1>Star Notary</h1>
                <div className="all-stars">
                    <h2>All Stars</h2>
                    <div className="stars-container">
                        {(this.state.allStars.length <= 0) ?
                            <div>There are no stars in the blockchain.</div> :
                            this.state.allStars.map((star, index) => {
                                return <StarCard star={star} key={index} isStarOwner={star.owner == this.props.accounts[0]} />
                            })}
                    </div>
                </div>
                <div className="my-stars">
                    <h2>My Stars</h2>
                    <span className="wallet-address">Address: {this.props.accounts[0]}</span>
                    <div className="stars-container">
                        {(this.state.ownerStars.length <= 0) ?
                            <div>You don't have any stars associated to your address</div> :
                            this.state.ownerStars.map((star, index) => {
                                return <StarCard star={star} key={index} isStarOwner={star.owner == this.props.accounts[0]} />
                            })}
                    </div>
                </div>
                <div className="add-star-div">
                    <h2>Add a new star</h2>
                    <form className="add-form">
                        <label htmlFor="name">
                            Name:
                        <input onChange={this.onChange.bind(this)} value={this.state.addForm.name} id="name" name="name" type="text"></input>
                        </label>
                        <label htmlFor="story">
                            Story:
                        <textarea onChange={this.onChange.bind(this)} value={this.state.addForm.story} id="story" name="story" />
                        </label>
                        <label htmlFor="dec">
                            Dec:
                        <input onChange={this.onChange.bind(this)} value={this.state.addForm.dec} id="dec" name="dec" type="text"></input>
                        </label>
                        <label htmlFor="mag">
                            Mag:
                        <input onChange={this.onChange.bind(this)} value={this.state.addForm.mag} id="mag" name="mag" type="text"></input>
                        </label>
                        <label htmlFor="cent">
                            Cent:
                        <input onChange={this.onChange.bind(this)} value={this.state.addForm.cent} id="cent" name="cent" type="text"></input>
                        </label>
                        <button onClick={this.addStar.bind(this)} className="sell-button">Add Star</button>

                    </form>
                </div>
            </div>);
    }

}

export default DAppClient;