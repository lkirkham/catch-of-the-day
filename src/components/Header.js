import React from "react";
import PropTypes from "prop-types";


const Header = (props) => {
    return(
        <header className="top">
            <h1>Catch 
                <span className="ofThe">
                <span className="of">Of</span>
                <span className="the">The</span>
                </span>
                Day</h1>
            <h3 className="tagline">
                {/* removed "this" from the prop reference as the header has been refactored to a stateless functional component */}
                <span>{props.tagline}</span> 
            </h3>
        </header>
    )
}
//Refactored to a Stateless Functional Component
// class Header extends React.Component{
// render(){
//     return(
//         <header className="top">
//             <h1>Catch 
//                 <span className="ofThe">
//                 <span className="of">Of</span>
//                 <span className="the">The</span>
//                 </span>
//                 Day</h1>
//             <h3 className="tagline">
//                 <span>{this.props.tagline}</span>
//             </h3>
//         </header>
//     )
// }
// }

Header.propTypes ={
    tagline: PropTypes.string.isRequired,
}
export default Header;