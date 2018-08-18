import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';

export default class AnalogClock extends Component {
	constructor(props, context) {
		super(props, context);
    this.state = {
    	hourDeg: 0,
    	minuteDeg: 0,
    	secondDeg: 0
    };
    this.clockInit = this.clockInit.bind(this);
	}

	componentWillMount() {
		this.clockInit();
	}

	clockInit() {
		let date = new Date();
		let hour = date.getHours() % 12;
		let minute = date.getMinutes();
		let second = date.getSeconds();

		this.setState({
			hourDeg: (hour * 30) + (0.5 * minute),
			minuteDeg: (minute * 6) + (0.1 * second),
			secondDeg: second * 6
		});

		setTimeout(this.clockInit, 1000)
	}

	render() {
		return (
			<div className="wrapper">
				<Card>
					<CardText className="card-text">
						<div className="clock-wrapper">
							<img className='clock-img' src="./images/clock_face.jpg" />
							<img src="./images/hour_hand.png" style={{transform: `rotate(${this.state.hourDeg}deg)`}} />
							<img src="./images/minute_hand.png" style={{transform: `rotate(${this.state.minuteDeg}deg)`}} />
							<img src="./images/second_hand.png" style={{transform: `rotate(${this.state.secondDeg}deg)`}} />
						</div>
					</CardText>
				</Card>
			</div>
		)
	}
}