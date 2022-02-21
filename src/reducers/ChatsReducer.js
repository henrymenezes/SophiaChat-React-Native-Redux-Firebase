const initialState = {
    chats:[],
    contacts:[], 
    activeChat:'',
    activeChatTitle:'',
    activeChatMessages:[]
}

const ChatsReducer =  ( state = initialState, action ) => {
    if(action.type == 'setContactsList'){
        return { ...state, contacts:action.payload.users }
    }
    if(action.type == 'setActiveChat'){
        return { ...state, activeChatTitle:action.payload.chatname, activeChat:action.payload.chatid }
    }
    if(action.type == 'setChatsList'){
        return { ...state, chats:action.payload.chats }
    }
    if(action.type == 'setActiveChatMessage'){
        return { ...state, activeChatMessages:action.payload.msgs }
    }
    if(action.type == 'closeActiveChat'){
        return {...state, activeChat:'', activeChatTitle:'', activeChatMessages:''}
    }
    return state
}

export default ChatsReducer