import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser } from '../actions/allAction';
import urls from '../constants/AppContants';
import { Button, Table, FormLabel } from "react-bootstrap";
import { encode } from "base-64";
import MirrorChatBot from './MirrorChatBot';

class UserPage extends Component {
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:''
      }
    }

    validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event, field) => {
     this.setState({
       [field]: event.target.value
     });
    }

    logout =() => {
      this.props.alterLoginStatus(false);
      //remove loggein user details
      this.props.loggedInUser({});
    }

   render() {
     let subscribedServices = this.props.subscribedList.map(service => service.id);
     return (
       <div className="Login">
          <h3> Hi {this.props.username}</h3>
          <Button onClick={this.logout}>Logout</Button>
          <h2>Echo Chat</h2>

          <MirrorChatBot />
    </div>
     );
   }
}

const mapStateToProps = state => ({
  userDetails: state.userServiceReducer.userDetails,
  username: state.userServiceReducer.userDetails.username,
  token: state.userServiceReducer.token,
  subscribedList: state.userServiceReducer.userDetails.subscribes || [],
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),
    loggedInUser: (user) => dispatch(loggedInUser(user)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
