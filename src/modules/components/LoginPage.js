import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser, tokenSetter } from '../actions/allAction';
import urls from '../constants/AppContants';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class LoginPage extends Component {
  constructor(props){
  super(props);
    this.state={
      username:'',
      password:''
    }
   }
   loginVerify(){
     let loginStatus = false;
     let checkUserDetails = this.props.allUsersList.forEach(u => {
       if(u.username == this.state.username && u.password == this.state.password){
         loginStatus = true;
         this.props.alterLoginStatus(true);
         this.props.loggedInUser({"username": this.state.username, "password": this.state.password});
         this.props.tokenSetter(this.state.username + ":" + this.state.password);
       }
     })
     if(!loginStatus){
       this.setState({ error: "Wrong UserName or Password!!!" })
     }
   }

   validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

   handleChange = event => {
     this.setState({
       [event.target.id]: event.target.value
     });
   }

   handleSubmit = event => {
     event.preventDefault();
     this.loginVerify();
   }

   render() {
     return (
       <div className="form-fields">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>User Name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
       </div>
     );
   }
}

const mapStateToProps = state => ({
  allUsersList: state.userServiceReducer.allUsersList,
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),
    loggedInUser: (user) => dispatch(loggedInUser(user)),
    tokenSetter: (saveUser) => dispatch(tokenSetter(saveUser)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
