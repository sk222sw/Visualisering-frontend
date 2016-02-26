import React from "react";
import {connect} from "react-redux";
import actions from "../actions";
import Settings from "../components/settings";

const SettingsPage = ({settings, routes, saveAndStart}) => <Settings saveAndStart={saveAndStart} settings={settings} routes={routes[0].childRoutes} />;

const mapStateToProps = appState => {
  return {
    settings: appState.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveAndStart(settings) {
      dispatch(actions.saveAndStart(settings));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
