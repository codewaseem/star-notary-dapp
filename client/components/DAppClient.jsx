import React from "react";
import starNotaryClient from "../StarNotaryClient";
import StarCard from "./StarCard";


class DAppClient extends React.Component {
    constructor() {
        super();
        this.state = {
            allStars: [],
            ownerStars: []
        }
    }

    async componentDidMount() {
        let ownerStars = await starNotaryClient.getAllStarsOfOwner(this.props.accounts[0]);
        let allStars = await starNotaryClient.getAllStarsInBlockChain();
        this.setState(() => ({ ownerStars, allStars }));
    }

    render() {

        console.log(this.state.ownerStars);
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
                                return <StarCard star={star} key={index} isStarOwner={star.owner == this.props.accounts[0]}/>
                            })}
                    </div>
                </div>
                <div className="add-star-form">
                    <h2>Add a new star</h2>
                </div>
            </div>);
    }

}

export default DAppClient;