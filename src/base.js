//allows us to mirror state to firebase
import Rebase from 're-base';
//official firebase pkg from firebase
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    //these details come from firebase project overview
    apiKey: "AIzaSyCfgTITr7n8utxyZhKUyR0N1iiF83ES6R8",
    authDomain: "catch-of-the-day-laura-kirkham.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-laura-kirkham.firebaseio.com",
})


const base = Rebase.createClass(firebaseApp.database());


//This is a named export
export {firebaseApp };

//This is a default export
export default base;
