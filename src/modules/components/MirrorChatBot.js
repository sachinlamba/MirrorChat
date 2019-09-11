import React, { Component} from 'react';
import { connect } from 'react-redux';
import { addMessagesToStore } from '../actions/allAction';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class MirrorChatBot extends React.Component {
	constructor(props){
  	super(props);
    this.state = {
			message  : {content: ""},
			messages : props.userMessages || []
		}
  }

  componentDidMount(){
  	this.connection = new WebSocket('wss://echo.websocket.org');
    this.connection.onmessage = evt => {
			let data = JSON.parse(evt.data)
			let msg = {
				username:this.props.userDetails.username, "by": "echo-bot", "time": new Date(), "content": data.content, "type": "text"
			}
    	this.setState({
      	messages : this.state.messages.concat([ msg ]),
				message: {content: ""}
      })
			this.props.addMessagesToStore(msg);
    };
  }
	handleChange = event => {
		this.setState({
			[event.target.id]: {content: event.target.value}
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		let msg = {
			username:this.props.userDetails.username, "by": this.props.userDetails.username, "time": new Date(), "content": this.state.message.content, "type": "text"
		};
		this.connection.send( JSON.stringify(msg) )
		this.props.addMessagesToStore(msg);

	}

  render() {
    return <div>
			<div>{ this.state.messages.map( (msg, i) => {
				if(msg.by != this.props.userDetails.username){
					return <div style={{color: "blue"}} key={'msg-' + i }>{ "Bot: " + msg.content }</div>
				}
				return <div style={{color: "black"}} key={'msg-' + i }>{ "You: " + msg.content }</div>
			} )}</div>

			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="message" bsSize="large">
					<FormLabel>Enter Message</FormLabel>
					<FormControl
						autoFocus
						type="text"
						value={this.state.message.content}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<Button	block bsSize="large" disabled={!this.state.message.content.length} type="submit"> Send </Button>
			</form>
		</div>
		;
  }
};

const mapStateToProps = state => ({
	userDetails: state.userServiceReducer.userDetails,
  userMessages: state.userServiceReducer.messageList[state.userServiceReducer.userDetails.username] || [],

})

const mapDispatchToProps = dispatch => (
  {
    addMessagesToStore: (msgDetails) => dispatch(addMessagesToStore(msgDetails)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MirrorChatBot);
