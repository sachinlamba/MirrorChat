import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser, newUserRegister, newUserDetails } from '../actions/allAction';
import urls from '../constants/AppContants';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class RegisterUser extends Component {
  constructor(props){
  super(props);
    this.state={
      username:'',
      password:'',
      confirm_password: '',
      errorMsg: ''
    }
   }


   validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0 && this.state.confirm_password.length > 0;
   }

   handleChange = event => {
     this.setState({
       [event.target.id]: event.target.value
     });
   }

   register(){
     if(this.state.password != this.state.confirm_password){
       this.setState({
         errorMsg: "Password not matching!!"
       })
       return
     }else{
       this.setState({
         errorMsg: ""
       })
     }

     this.props.newUserDetails({"username": this.state.username, "password": this.state.password});
     this.props.newUserRegister(false);

   }
   handleSubmit = event => {
     event.preventDefault();
     this.register();
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
           <FormGroup controlId="confirm_password" bsSize="large">
             <FormLabel>Confirm Password</FormLabel>
             <FormControl
               value={this.state.confirm_password}
               onChange={this.handleChange}
               type="password"
             />
           </FormGroup>
           <Button
             bsSize="large"
             disabled={!this.validateForm()}
             type="submit"
           >
             Register
           </Button>
         </form>
       </div>
     );
   }
}

const mapStateToProps = state => ({
  userDetails: state.userServiceReducer.userDetails,
  username: state.userServiceReducer.userDetails.username,
  subscribedList: state.userServiceReducer.userDetails.subscribes || [],
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),
    loggedInUser: (user) => dispatch(loggedInUser(user)),
    newUserRegister: (status) => dispatch(newUserRegister(status)),
    newUserDetails: (user) => dispatch(newUserDetails(user)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
