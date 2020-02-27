import React from "react";
import {formatPrice} from '../helpers.js'

class Order extends React.Component{
renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    //isAvailable means check for fish and if there is a fish that ths status is available
    const isAvailable = fish && fish.status === 'available';
    //if there is not a fish, return null.
    if(!fish)return null
    //if the fish is not available, display message
    if(!isAvailable){
    return <li key={key}> Sorry {fish ? fish.name : 'fish'} is no longer available</li>
    }
    //display the fish  details in the order listing
    return <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
    </li>
}

render(){
    // turn order object into an array
    const orderIds = Object.keys(this.props.order);
    // take a running total of each item in array
    const total = orderIds.reduce((prevTotal, key) =>{
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        if (isAvailable) {
            return prevTotal + (count * fish.price);
        }   return prevTotal }, 0);

    return(
        <div className="order-wrap">
            <h2>Order</h2>
            <ul className="order">
                {/* displays the fish name & quantity */}
                {orderIds.map(this.renderOrder)}
            </ul>
                <div className="total">
                    Total:
                         <strong>{formatPrice(total)}</strong>
                </div>
        </div>
    )
}
}
export default Order;