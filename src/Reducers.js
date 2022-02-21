import { combineReducers } from 'redux'
import AuthReducer from './reducers/AuthReducer'
import ChatsReducer from './reducers/ChatsReducer'


const Reducers = combineReducers({
    auth:AuthReducer,
    chats:ChatsReducer
})

export default Reducers