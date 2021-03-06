import React from "react";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import sampleFishes from "../sample-fishes.js";
import Fish from './Fish.js';
import base from '../base.js';

class App extends React.Component{
//setting initial state before the component actually mounts
//can be set in the constructor using super, or in a property (like below)
state ={
 fishes: {},
 order: {}
};
//LIFESYCLE METHODS
componentDidMount(){
    //first reinstate local storage of order
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    // check to see if there is a local storage value, if there is - reinstate it
    if(localStorageRef){
        this.setState({
            //converts string back to an object
            order: JSON.parse(localStorageRef)
        });
    }

    //to reference the fishes object which will contain and mirror our state
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    });
}

componentDidUpdate(){
    console.log(this.state.order);
    //save the updating order state into local storage (stored in browser)
    //the url slug is the key, and the value is the state- which is an object, but needs to be converted to a string.
    // JSON.stringify will convert to string
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
}

componentWillUnmount(){
    //as soon as the component unmounts - clean up!
    base.removeBinding(this.ref);
}


//CUSTOM METHODS
//the methods that update state and the state itself need to live in the same component
//method to add new fish to state
addFish = (fish) => {
    //1. take a copy of the existing state using an object spread
    //take our old fish
    const fishes = {...this.state.fishes}
    //2. add our new fish to that copied fishes variable
    // add our new fish
    fishes[`fish${Date.now()}`] = fish; //the unique timestamped fish is now equal to the fish that got passed to addFish fn (from the addFishForm)
    //3. set new fishes object to state
    // trigger overwrite of existing state (above), which will trigger a change anywhere displayed on page
    this.setState({
        //pass it the piece of state we wish to update (fishes), and update it to the variable  you want to update it with (fishes)
        fishes: fishes
    })
};

updateFish = (key, updatedFish) => {
// 1. take a copy of the current state
const fishes = {...this.state.fishes}
//2. update the state
fishes[key] = updatedFish;
//3. set that to state
this.setState({fishes:fishes});
}

deleteFish = (key) =>{
//1. take a copy of state
const fishes = {...this.state.fishes};
//2. update the state
fishes[key] = null;
//3. Update state (similar to update state except we are updating )
this.setState({fishes:fishes});
}

addSampleFishes = (fishes) => {
    this.setState({fishes: sampleFishes})
}

addToOrder = (key) => {
    // 1. take copy of state
    const order = {...this.state.order};
    //2. add to order, or update number in the order
    order[key] = order[key]+ 1 || 1;
    //3. call setState to update state object
    this.setState({order: order});
}

removeFromOrder = (key) => {
    // 1. take copy of state
    const order = {...this.state.order};
    //2. remove from order
    delete order[key];
    //3. call setState to update state object
    this.setState({order: order});
}

render(){
    return(
        <div className="catch-of-the-day">
           <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
            <ul className="fishes">
                {/* object.keys gives us the keys of the object we pass in (in this case - the fishes state) as an array */}
                {/* must also give each iteration of the component a property called key with a unique identifier */}
                {/* the fishes state is passed to the fish component via props (in this case "details") and is made dynamic by using square bracket syntax and the unique key */}
                {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
            </ul>
           </div>
           <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/> 
           <Inventory addFish={this.addFish} addSampleFishes={this.addSampleFishes} updateFish={this.updateFish} deleteFish={this.deleteFish} fishes={this.state.fishes} storeId={this.props.match.params.storeId}/>
        </div>
    )
}
}

export default App;