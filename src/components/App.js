import React from "react";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";

class App extends React.Component{
//setting initial state before the component actually mounts
//can be set in the constructor using super, or in a property (like below)
state ={
 fishes: {

 },
 order: {}
};
//the methods that update state and the state itself need to live in the same component
//method to add new fish to state
addFish = (fish) => {
    //1. take a copy of the existing state using an object spread
    //take our old fish
    const fishes = {...this.state.fishes}
    //2. add our new fish to that copied fishes variable
    // add our new fish
    fishes[`fish${Date.now()}`] = fish //the unique timestamped fish is now equal to the fish that got passed to addFish fn (from the addFishForm)
    //3. set new fishes object to state
    // trigger overwrite of existing state (above), which will trigger a change anywhere displayed on page
    this.setState({
        //pass it the piece of state we wish to update (fishes), and update it to the variable  you want to update it with (fishes)
        fishes: fishes
    })
};

render(){
    return(
        <div className="catch-of-the-day">
           <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
           </div>
           <Order />
           <Inventory addFish={this.addFish}/>
        </div>
    )
}
}

export default App;