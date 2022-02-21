const initialState = {
    name:'Sophia',
    email:'sophia@gmail.com', 
    password:'123456',
    uid:'',
    status:0
}

const AuthReducer = (state = initialState, action) => {
    
    if(action.type == 'changeStatus'){
        return { ...state, status:action.payload.status }
    }

    if(action.type == 'changeEmail'){
        return { ...state, email:action.payload.email }
    }

    if(action.type == 'changePassword'){
        return { ...state, password:action.payload.password }
    }

    if(action.type == 'changeName'){
        return { ...state, name:action.payload.name }
    }

    if(action.type == 'changeUid'){
        return { ...state, status:1, name:action.payload.name, uid:action.payload.uid }
    }
    return state
}

export default AuthReducer
