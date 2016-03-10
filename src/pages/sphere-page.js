import React from "react";
import {connect} from "react-redux";
import Sphere from "../components/sphere";

// Since a few versions back you can create React components that don't
// have any state or don't use any of the lifecycle methods (like componentDidMount)
// as simple functions that gets their props sent in as parameters.
// For more info see: https://facebook.github.io/react/docs/reusable-components.html#stateless-functions

const SpherePage = ({data}) => <Sphere data={data} />;
// This is one of those stateless functions with some extra pizazz added by doing
// some object destructuring on the props. The code above is equal to doing this:
// const SpherePage = (props) => (<Sphere data={props.data} />);

// This is the magic provided by react-redux, you can pass props to the component like Scotty beams up Kirk!
const mapStateToProps = appState => {
  return {
    data: appState.components.positions
  };
};

export default connect(mapStateToProps)(SpherePage);
