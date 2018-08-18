import React, {Component} from 'react';
// import FlatButton from 'material-ui/FlatButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import DigitalClock from './digitalClock';
import AnalogClock from './analogClock';
import StopClock from './stopClock';
import Counter from './counter';

const styles = {
  container: {
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
            title="Home"
            color="default"
            iconElementLeft={<div></div>}
          ></AppBar>
          
          <div className="cards">
            <div className="clock">
              <DigitalClock></DigitalClock>
            </div>

            <div className="analog">
              <AnalogClock></AnalogClock>
            </div>

            <div className="stopWatch">
              <StopClock></StopClock>
            </div>

            <div className="counter">
              <Counter></Counter>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}