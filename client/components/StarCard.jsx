import React from "react";
import StarIcon from "./star.svg";
import starNotaryClient from "../StarNotaryClient";

class StarCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            saleFor: props.star.price || 0
        };
    }

    async putStarForSale(e) {
        e.preventDefault();
        let tx = await starNotaryClient.putStarForSale(this.props.star.id, this.state.saleFor);
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
        this.toggleForm();
    }

    async buyStar() {
        let { id, price } = this.props.star;
        let tx = await starNotaryClient.buyStar(id, price);
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
    }

    renderStarInfo(star, isStarOwner) {
        return (
            <div className="star-card" style={{ background: `linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.8)), url(${StarIcon})`, backgroundRepeat: "round", backgroundSize: "cover" }} >
                <div className="star-info">
                    <h2 className="star-info-heading">Star Info <span className="star-id">(#{star.id})</span> </h2>
                    <div className="star-name">
                        <h3>Name</h3>
                        <p>{star.name}</p>
                        {star.price > 0 && (
                            <React.Fragment>
                                <h3>Star is for sale at</h3>
                                <p>{star.price} ETH</p>
                            </React.Fragment>
                        )}
                    </div>
                    <div className="star-story">
                        <h3>Story</h3>
                        <p>{star.story}</p>
                    </div>
                    <div className="star-coordinates">
                        <h3>Coordinates</h3>
                        <p>Dec {star.dec}</p>
                        <p>Mag {star.mag}</p>
                        <p>Cent {star.cent}</p>
                    </div>
                    {isStarOwner ?
                        <button onClick={this.toggleForm.bind(this)} className="sell-button">Sell</button> :
                        star.price > 0 && <button onClick={this.buyStar.bind(this)} className="sell-button">Buy</button>
                    }
                </div>
            </div >
        );
    }

    onPriceChange(event) {
        let price = event.target.value;
        this.setState({ saleFor: price });
    }

    toggleForm() {
        this.setState((prevState) => ({ showForm: !prevState.showForm }))
    }


    renderSaleForm(star) {
        return (
            <div className="sell-form-div" onClick={this.toggleForm.bind(this)}>
                <form className="sell-star-form" onClick={(e) => e.stopPropagation()}>
                    <h4>Sell {star.name} (#{star.id}) ?</h4>
                    <label htmlFor="sale">
                        How much to sell for? <br />
                        Set 0 to remove from sale.
                    </label>
                    <input value={this.state.saleFor} onChange={this.onPriceChange.bind(this)} name="sale" id="sale" type="number" placeholder="0.003 (in ethers)"></input>
                    <button className="sell-button" onClick={this.putStarForSale.bind(this)}>Put Star For Sale</button>
                </form>
            </div>
        );
    }

    render() {
        let { star } = this.props;
        return (
            <div style={{ maxWidth: "350px", minWidth: "300px" }}>

                {this.renderStarInfo(star, this.props.isStarOwner)}
                {this.state.showForm &&
                    this.renderSaleForm(star)
                }

            </div>
        );
    }
}

export default StarCard;