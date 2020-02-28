import React from "react";
import {PropTypes} from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm.js"
import EditFishForm from "./EditFishForm.js"
import Login from "./Login.js"
import base, { firebaseApp } from "../base.js";

class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        index: PropTypes.string,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        addSampleFishes: PropTypes.func,
    }
    //can set initial state here because the login is only relevent to this component.
    state ={
        uid: null,
        owner: null,
    };

    componentDidMount(){
        //firebase will check if we've logged in, and pass us a user
        firebase.auth().onAuthStateChanged(user => {
            //if there is a user, its passed to the authHandler authentication method
            if(user){
                this.authHandler({user: user});
            }
        })
    }

    authHandler = async (authData) => {
        //look up current store in firebase database
            //base.fetch() returns a promise, so if we want the store in the variable - not the promise, await is added
        const store =  await base.fetch(this.props.storeId, {context:this});
        console.log(store);
        // claim it if there is no owner.
        if (!store.owner){
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid,
            })
        }
        //set state of the inventory component to reflect the current user
        this.setState({
            //who is the logged in user?
            uid: authData.user.uid,
            //who is the owner of this store?
            owner: store.owner || authData.user.uid,
        })
    }
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
    logout = async () => {
        console.log('logging out');
        await firebase.auth().signOut();
        //clear the state
        this.setState({uid: null})
    }
render(){
    const logout = <button onClick={this.logout}>Log Out</button>
    //1. check if they are logged in
        //if there is no currently logged in user
    if (!this.state.uid){
        return <Login authenticate={this.authenticate}/>
    }

    //2, check if they are NOT the owner of the store
    if (this.state.uid !== this.state.owner){
        return <div><p>Sorry, you are not the owner of this store.</p>
        {logout}
        </div>
    }
    //3. if the above don't display they must be the owner and display inventory.
    return(
        <div className="inventory">
            <h2>Inventory</h2>
            {/* display logout button */}
            {logout}
            {/* take the object this.props.fishes, turn it into an array with object.keys, map over it and for each fish make an EditFishForm */}
            {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish}  fish={this.props.fishes[key]} />)}
            {/* add the AddFish form */}
            <AddFishForm addFish={this.props.addFish} />
            {/* add sample fishes button */}
            <button onClick={this.props.addSampleFishes}>Add Sample Fishes</button>
        </div>
    )
}
}
export default Inventory;