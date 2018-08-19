import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';

export default class DigitalClock extends Component {
	constructor(props, context) {
		super(props, context);
    this.state = {
    	time: ''
    };
    this.showTime = this.showTime.bind(this);
	}

	componentWillMount() {
		this.showTime();
	}

	showTime() {
		let date = new Date();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		let maredian = 'AM';

		if(h==0) h=12;
		if(h>12) {
			h = h-12;
			maredian = 'PM';
		}

		h = (h<10) ? `0${h}` : h;
		m = (m<10) ? `0${m}` : m;
		s = (s<10) ? `0${s}` : s;

		this.setState({time: `${h}:${m}:${s} ${maredian}`});
		setTimeout(this.showTime, 1000);
	}


	render() {
		return (
			<div className="wrapper">
				<Card>
					<CardText className="card-text">
						<div className="content">
							{this.state.time}
						</div>
					</CardText>
				</Card>
			</div>
		)
	}
}
