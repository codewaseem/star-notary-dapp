import React from "react";
import starNotaryClient from "../StarNotaryClient";
import StarCard from "./StarCard";


class DAppClient extends React.Component {
    constructor() {
        super();
        this.state = {
            stars: []
        }
    }
    reduceStarArrayToObject(stars) {
        return stars.map((star) => {
            return star.reduce((obj, starProperty, index) => {
                obj[STAR_PROPS_NAMES[index]] = starProperty;
                return obj;
            }, {});
        });
    }
    async componentDidMount() {
        let stars = await starNotaryClient.getAllStarsInfoFor(this.props.accounts[0]);
        this.setState(() => ({ stars }));
    }

    render() {
        if (this.state.stars.length <= 0)
            return <div>No stars found</div>
        else {
            console.log(this.state.stars);
            return (
                <div className="dapp">
                    <h1>Star Notary</h1>
                    <div className="my-stars">
                        <h2>My Stars</h2>
                        <span className="wallet-address">Address: {this.props.accounts[0]}</span>
                        <div className="stars-container">
                            {this.state.stars.map((star, index) => {
                                return <StarCard star={star} key={index} />
                            })}
                        </div>
                    </div>
                    <div className="add-star-form">
                        <h2>Add a new star</h2>
                    </div>
                </div>);
        }

    }
}

export default DAppClient;