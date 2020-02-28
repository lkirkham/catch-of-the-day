import React from 'react';

class EditFishForm extends React.Component {
    handleChange = event => {
        console.log(event.currentTarget.value);

        //update the fish
        //1, take copy of current fish
        const updatedFish = {
            ...this.props.fish,
        // computed property names - new in es6 makes the value being updated dynamic ie. event.currentTarget.name
        [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    };
    render(){
        return <div className="fish-edit">
            <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
            <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/>
            <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name=" desc" onChange={this.handleChange} value={this.props.fish.desc}/>
            <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
        </div>
    }s
}

export default EditFishForm;