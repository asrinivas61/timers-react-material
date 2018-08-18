import React, { Component } from 'react';

import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class StopClock extends Component {
	constructor(props, context) {
		super(props, context);
    this.state = {
    	hours: 0,
    	minutes: 0,
    	seconds: 0,
    	milliSec: 0,
    	clockState: true,
    	isStarted: false,
    	isStopped: false
    };
    this.initCheck = this.initCheck.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
    this.setMilliseconds = this.setMilliseconds.bind(this);
    this.reset = this.reset.bind(this);
	}

	componentWillMount() {
		this.initCheck();
	}

	initCheck() {
		let { hours, minutes, seconds } = this.state;
		this.setState({
			hours: (hours<10)?`0${+hours}`:hours,
			minutes: (minutes<10)?`0${+minutes}`:minutes,
			seconds: (seconds<10)?`0${+seconds}`:seconds
		})
	}

	startCounter() {
		let { hours, minutes, seconds, isStopped } = this.state;

		++seconds;
		if(seconds>59) {
			seconds = 0;
			++minutes;
		}
		if(minutes>59) {
			minutes = 0;
			++hours;
		}

		this.setState({
			hours: (hours<10)?`0${+hours}`:hours,
			minutes: (minutes<10)?`0${+minutes}`:minutes,
			seconds: (seconds<10)?`0${+seconds}`:seconds,
			isStarted: true,
			isStopped: false
		});

		this.setMilliseconds();
		if(!isStopped)
			setTimeout(this.startCounter, 1000);
	}

	setMilliseconds() {
		let { milliSec, isStopped } = this.state;
		let intervalRef;

		if(!intervalRef) {
			intervalRef = setInterval(() => {
				this.setState({milliSec: (milliSec>999)?0:++milliSec});
			}, 1);
		}
		if(isStopped) clearInterval(intervalRef);
	}

	stopCounter() {
		this.setState({
			isStopped: !this.state.isStopped,
			isStarted: false
		});
	}

	reset() {
		this.setState({hours: 0, minutes: 0, seconds: 0, isStopped: true});
	}

	render() {
		let { hours, minutes, seconds, milliSec, isStarted, isStopped } = this.state;
		return (
			<div className="wrapper">
				<Card>
					<CardText className="card-text">
						<div className="timer">
							{`${hours}:${minutes}:${seconds}: ${milliSec}`}
						</div>
						<div className="btns">
							<div className="btns-cover">
								<RaisedButton label="Start" backgroundColor="#a4c639" onClick={this.startCounter} disabled={isStarted} />
								<RaisedButton label={this.state.clockState?'Reset':'Resume'} primary={true} onClick={this.reset} />
								<RaisedButton label="Stop" secondary={true} onClick={this.stopCounter} disabled={isStopped} />
							</div>
						</div>
					</CardText>
				</Card>
			</div>
		)
	}
}