import React from 'react';
import {connect} from 'react-redux';
import Settings from '../components/settings';

const SettingsPage = ({settings, routes}) => (<Settings settings={settings} routes={routes[0].childRoutes} />);

const mapStateToProps = appState => {
  return {
    settings: appState.settings
  };
};

export default connect(mapStateToProps)(SettingsPage);