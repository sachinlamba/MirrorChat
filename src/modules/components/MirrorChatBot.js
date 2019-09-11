import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus } from '../actions/allAction';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class MirrorChatBot extends React.Component {
	constructor(props){
  	super(props);
    this.state = {
			message  : "",
			messages : []
		}
  }

  componentDidMount(){
  	this.connection = new WebSocket('wss://echo.websocket.org');
    this.connection.onmessage = evt => {
    	this.setState({
      	messages : this.state.messages.concat([ evt.data ]),
				message: ""
      })
    };
  }
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.connection.send( this.state.message )
	}

  render() {
    return <div>
			<ul>{ this.state.messages.slice(-5).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>

			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="message" bsSize="large">
					<FormLabel>Enter Message</FormLabel>
					<FormControl
						autoFocus
						type="text"
						value={this.state.message}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<Button	block bsSize="large" disabled={!this.state.message.length} type="submit"> Send </Button>
			</form>
		</div>
		;
  }
};

const mapStateToProps = state => ({
  userDetails: state.userServiceReducer.userDetails
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MirrorChatBot);
