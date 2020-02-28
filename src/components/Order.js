import React from "react";
import {formatPrice} from '../helpers.js'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {PropTypes} from "prop-types";



class Order extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }
renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    //isAvailable means check for fish and if there is a fish that ths status is available
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions ={
        classNames:"order",
        key:key,
        timeout:{enter: 250, exit: 250}
    }
    //if there is not a fish, return null.
    if(!fish)return null
    //if the fish is not available, display message
    if(!isAvailable){
    return (<CSSTransition {...transitionOptions}>
            <li key={key}> Sorry {fish ? fish.name : 'fish'} is no longer available</li>
         </CSSTransition>);
    };
    //display the fish  details in the order listing
    //CSS Transition wraps the regular LI return to animate it
    //classNames is needed (note the S), a key, and a timeout, which indicates how fast it comes in and how fast it comes out
    return (<CSSTransition {...transitionOptions}>
        <li key={key}>
            <span>
                <TransitionGroup component="span" className="count">
                    <CSSTransition classNames="count" key={count} timeout={{enter:250, exit: 250}}>
                        <span>{count}</span>
                    </CSSTransition>
                </TransitionGroup>
                lbs {fish.name}
                {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
            </span>
        </li>
    </CSSTransition>);
};

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
            {/* TransitionGroup replaced UL after the fact to create animation - it indicates that the component to render is a UL */}
            <TransitionGroup component="ul" className="order">
                {/* displays the fish name & quantity */}
                {orderIds.map(this.renderOrder)}
            </TransitionGroup>
                <div className="total">
                    Total:
                         <strong>{formatPrice(total)}</strong>
                </div>
        </div>
    )
}
}
export default Order;