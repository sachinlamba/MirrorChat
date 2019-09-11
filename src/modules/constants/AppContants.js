const localhost = true;
const localhostURL = "http://localhost:8080/api";
// https://service-subscriber.herokuapp.com/
const herokuURL = "/api";
let url = "";
if(localhost){
  url = localhostURL;
}else{
  url = herokuURL;
}

export default {
  allServices: url + "/allServices",
  authenticate: url + "/authenticate",
  userSubscribeServices: url + "/userSubscribeServices",
  users: url + "/users"
}
