import React from 'react';

export default class DeleteWarning extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: false
		}
	}

	deleteprompt = () => {
		this.setState({
			message: !this.state.message
		})
	}

	deleteEvent = () => {
		console.log('Delete event click');
		this.props.deleteEvent();
	}

	render() {
		if (this.state.message) {
			return (
				<div>
					<p>Are you sure you want to delete this event?</p>
					<button onClick={this.deleteEvent}>yes</button> <button onClick={this.deleteprompt}>no</button>
				</div>
			)
		}
		else {
			return (
				<button onClick={this.deleteprompt}>Delete</button>
			)
		}
	}
}