import { LOGIN_STATUS, REGISTER_USER, TOKEN_SETTER, NEW_MESSAGE,
  FETCH_API, FETCHED_DATA, STUDENT_SELECTED , SELECTION_POPUP, LOGIN_USER, NEW_USER} from '../actions/allAction';
import initialState from "../constants/initialState.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_SETTER:
      return Object.assign({}, state, { token: action.token })
    case LOGIN_STATUS:
      return Object.assign({}, state, { loginStatus: action.data })
    case LOGIN_USER:
      return Object.assign({}, state, { userDetails: action.user })
    case NEW_USER:
      let newAllUsersList = state.allUsersList;
      newAllUsersList.push(action.user);
      return Object.assign({}, state, { allUsersList: newAllUsersList })
    case REGISTER_USER:
      return Object.assign({}, state, { register: action.data })
    case SELECTION_POPUP:
      return Object.assign({}, state, { studentDetailsPopup: action.payload })
    case NEW_MESSAGE:
      let messageList = state.messageList;
      let userMessages = messageList[action.msg.username] || [] ;
      userMessages.push(action.msg);
      messageList[action.msg.username] = userMessages;
      return Object.assign({}, state, { messageList })
    default:
      return state
  }
}
