import React from 'react';
import {PropTypes} from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component{
    static propTypes = {
        history: PropTypes.object,
    }
myInput = React.createRef();

goToStore = event => {
//stop form from submitting
event.preventDefault();
//get the text from the input
const storeName = this.myInput.current.value;
//change the page to /store/whatever-they-entered
this.props.history.push(`/store/${storeName}`);
};

    render(){
        return (<form className="store-selector" onSubmit={this.goToStore}>
            {/* commenting in JSX*/}
            <h2>Please Enter a Store</h2>
            <input
            type="text"
            required 
            ref={this.myInput}
            placeholder="Store Name" 
            defaultValue={getFunName()}
            />
            <button >Visit Store →</button>
        </form>
        )
    }
}

export default StorePicker;