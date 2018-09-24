import React from "react";
import StarIcon from "./star.svg";

class StarCard extends React.Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            saleFor: 0
        };
    }

    putStarForSale(e) {
        e.preventDefault();

        this.toggleForm();
    }
    renderStarInfo(star, isStarOwner) {
        return (
            <div className="star-card" style={{ background: `linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.8)), url(${StarIcon})`, backgroundRepeat: "round", backgroundSize: "cover" }} >
                <div className="star-info">
                    <h2 className="star-info-heading">Star Info <span className="star-id">(#{star.id})</span> </h2>
                    <div className="star-name">
                        <h3>Name</h3>
                        <p>{star.name}</p>
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
                        <button onClick={this.toggleForm.bind(this)} className="sell-button">Buy</button>
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