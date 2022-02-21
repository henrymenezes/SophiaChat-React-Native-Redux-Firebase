import firebase from '../FirebaseConn'

export const SignOut = () => {
    firebase.auth().signOut()

    return {
        type:'changeStatus',
        payload:{
            status:2
        }
    }
}
export const checkLogin = () => {

    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user)=>{

            if(user){
                //user logged
                firebase.database().ref('users').child(user.uid).child('name').once('value').then((snapshot)=>{
                

                    dispatch({
                        type:'changeUid',
                        payload:{
                            uid:user.uid,
                            name:snapshot.val()
                        }
                    }) 
                    

                })

            }else{
                //user not logged
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2
                    }
                })
            }

        });
    }


}

export const SignUpAction = (name, email, password, callback) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=>{

                let uid = firebase.auth().currentUser.uid
                callback()
                firebase.database().ref('users').child(uid).set({
                    name:name
                })

                dispatch({
                    type:'changeUid',
                    payload:{
                        uid:uid,
                        name:name
                    }
                })

            })
            .catch((error)=>{
                switch(error.code){
                    case 'auth/email-already-in-use':
                        alert("Email já utilizado!")
                        break;
                    case 'auth/invalid-email':
                        alert("Email inválido!")
                        break;
                    case 'auth/operation-not-allowed':
                        alert("Tente novamente mais tarde!")
                        break;
                    case 'auth/weak-password':
                        alert("Digite uma senha melhor!")
                        break;
                }
                callback()
            })


    }
}

export const SignInAction = (email,password,callback) => {
    return(dispatch) => {

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user)=>{

                let uid = firebase.auth().currentUser.uid
                callback()
                firebase.database().ref('users').child(uid).child('name').once('value').then((snapshot)=>{

                    dispatch({
                        type:'changeUid',
                        payload:{
                            uid:uid,
                            name:snapshot.val()
                        }
                    })

                })
                
            })
            .catch((error)=>{
                switch(error.code){
                    case 'auth/invalid-email':
                        alert("Email inválido!")
                        break;
                    case 'auth/user-disabled':
                        alert("Seu usuário está desativado!")
                        break;
                    case 'auth/user-not-found':
                        alert("Não existe este usuário!")
                        break;
                    case 'auth/wrong-password':
                        alert("Email e/ou senha errados!")
                        break;
                }
                callback()
            })

    }
}

export const changeEmail = (email) => {
    return {
        type:'changeEmail',
        payload:{
            email:email
        }
    }
}

export const changePassword = (password) => {
    return{
        type:'changePassword',
        payload:{
            password:password
        }
    }
}

export const changeName = (name) => {
    return {
        type:'changeName',
        payload:{
            name:name
        }
    }
}