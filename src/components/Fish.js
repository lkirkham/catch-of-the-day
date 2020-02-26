import React from 'react';
import {formatPrice} from '../helpers.js';

class Fish extends React.Component{
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
render(){
    const isAvailable = this.props.details.status === 'available';
    return(
       <li className="menu-fish">
           <img src={this.props.details.image} alt={this.props.details.name}/>
           <h3 className="fish-name">
               {this.props.details.name}
    <span className="price">{formatPrice(this.props.details.price)}</span>
           </h3>
           <p>{this.props.details.desc}</p>
           <button onClick={this.handleClick} disabled={!isAvailable}>{isAvailable ? 'Add To Order' : 'Sold Out'}</button>
       </li>
    )
}
}
export default Fish;