// import C from '../constants';
import {hashHistory} from 'react-router';

export default {
  saveAndStart(settings) {
    return (dispatch, getState) => {
      const timeInSeconds = Number(settings.time) * 1000;
      let index = 0;

      hashHistory.push(settings.pathsToVisit[index]);
      index++;

      setInterval(() =>{
        index++;
        if (settings.pathsToVisit[index]) {
          hashHistory.push(settings.pathsToVisit[index]);
        } else {
          index = 0;
          hashHistory.push(settings.pathsToVisit[index]);
        }
      }, timeInSeconds);
    };
  }
};