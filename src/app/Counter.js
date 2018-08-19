import React, { Component } from 'react';

import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class Counter extends Component {
	constructor(props, context) {
		super(props, context);
    this.state = {
    	hours: 0,
    	minutes: 10,
    	seconds: 0,
    	isStarted: false,
    	isStopped: false
    };
    this.startCounter = this.startCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentWillMount() {
		let { hours, minutes, seconds } = this.state;
		this.setState({
			hours: (hours<10)?`0${+hours}`:hours,
			minutes: (minutes<10)?`0${+minutes}`:minutes,
			seconds: (seconds<10)?`0${+seconds}`:seconds
		})
	}

	startCounter() {
		let { hours, minutes, seconds, isStopped } = this.state;
		this.setState({isStopped:false});

		--seconds;
		if(seconds<0) {
			seconds = 59;
			--minutes;
		}
		if(minutes<0) {
			minutes = 59;
			--hours;
		}

		if (+hours<0) {
			this.reset();
			return;
		}

		if(!isStopped) {
			setTimeout(this.startCounter, 1000);
		}else {
			return;
		}

		this.setState({
			hours: hours,
			minutes: (minutes<10)?`0${+minutes}`:minutes,
			seconds: (seconds<10)?`0${+seconds}`:seconds,
			isStarted: true
		});
	}

	stopCounter() {
		this.setState({isStopped: true, isStarted: false});
	}

	reset() {
		this.setState({
			hours: '00',
    	minutes: '10',
    	seconds: '00',
    	isStarted: false,
    	isStopped: true
		})
	}

	render() {
		let { hours, minutes, seconds, isStarted, isStopped } = this.state;
		return (
			<div className="wrapper">
				<Card>
					<CardText className="card-text">
						<div className="timer">
							{`${hours}:${minutes}:${seconds}`}
						</div>
						<div className="btns">
							<div className="btns-cover">
								<RaisedButton label="Start" backgroundColor="#a4c639" onClick={this.startCounter} disabled={isStarted} />
								<RaisedButton label="Reset" primary={true} onClick={this.reset} />
								<RaisedButton label="Stop" secondary={true} onClick={this.stopCounter} disabled={isStopped} />
							</div>
						</div>
					</CardText>
				</Card>
			</div>
		)
	}
}
