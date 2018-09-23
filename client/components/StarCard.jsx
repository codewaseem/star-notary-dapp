import React from "react";
import StarIcon from "./star.svg";

const StarCard = ({ star }) => {
    return (
        <div className="star-card" style={{ background: `linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.8)), url(${StarIcon})`, backgroundRepeat: "round", backgroundSize: "cover" }} >

            <div>
                <h2 className="star-info-heading">Star Info</h2>
                <p className="star-id">#{star.id}</p>
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
                <button className="sell-button">Sell</button>
            </div>
        </div >
    );
}

export default StarCard;