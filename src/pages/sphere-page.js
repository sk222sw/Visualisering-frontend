import React from 'react';
import {connect} from 'react-redux';
import Sphere from '../components/sphere';

const SpherePage = ({data}) => (<Sphere data={data} />);

// This is the magic provided by react-redux, you can pass props to the component like Scotty beams up Kirk!
// If we wanted to keep the Sphere component clean we could of course keep this in a parent component.
const mapStateToProps = appState => {
    return {
        data: appState.sphere.data
    };
};

export default connect(mapStateToProps)(SpherePage);
