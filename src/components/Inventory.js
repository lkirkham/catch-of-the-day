import React from "react";
import AddFishForm from "./AddFishForm.js"
import EditFishForm from "./EditFishForm.js"

class Inventory extends React.Component{
render(){
    return(
        <div className="inventory">
            <h2>Inventory</h2>
            {/* take the object this.props.fishes, turn it into an array with object.keys, map over it and for each fish make an EditFishForm */}
            {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} updateFish={this.props.updateFish} fish={this.props.fishes[key]} />)}
            {/* add the AddFish form */}
            <AddFishForm addFish={this.props.addFish} />
            {/* add sample fishes button */}
            <button onClick={this.props.addSampleFishes}>Add Sample Fishes</button>
        </div>
    )
}
}
export default Inventory;