import firebase from '../FirebaseConn'

export const getChatsList = ( userUid ) => {
    return (dispatch) => {

        firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot)=>{
            let chats = []

            snapshot.forEach((childItem)=>{

                    chats.push({
                        key:childItem.key,
                        refName:childItem.val().refName,
                        refUid:childItem.val().refUid
                    })
                
            })
            
            dispatch({
                type:'setChatsList',
                payload:{
                    chats:chats
                }
            })
        
        })

    }
}

export const getContactsList = ( userUid ) => {
    return (dispatch) => {

        firebase.database().ref('users').orderByChild('name').on('value', (snapshot)=>{

            let users = []
            snapshot.forEach((childItem)=>{

                if(childItem.key != userUid) {
                    users.push({
                        key:childItem.key,
                        name:childItem.val().name
                    })
                }
                
            })
            
            dispatch({
                type:'setContactsList',
                payload:{
                    users:users
                }
            })

        })

    }
}

export const createChat = (userUid1, userUid2, username1, username2, callback) => {
    return(dispatch) => {

        if(username2==''){ 
            username2 = username1  
        }
        //criando o próprio chat
        let newChat = firebase.database().ref('chats').push()
        newChat.child('members').child(userUid1).set({
            id:userUid1
        })
        newChat.child('members').child(userUid2).set({
            id:userUid2
        }) 

        //associando aos envolvidos
        let chatId = newChat.key
        
        firebase.database().ref('users').child(userUid1).child('chats')
            .child(chatId).set({
                id:chatId,
                refName:username2,
                refUid:userUid2
        })

        firebase.database().ref('users').child(userUid2).child('chats')
             .child(chatId).set({
                 id:chatId,
                 refName:username1,
                 refUid:userUid1
         }).then(()=>{
            callback(chatId)
            dispatch({
                type:'setActiveChat',
                payload:{
                    chatid:chatId,
                    chatname:username2,
                },
            })
         })

    }
}

export const setActiveChat = (chatId,refName) => {
    return {
        type:'setActiveChat',
        payload:{
            chatid:chatId,
            chatname:refName
        }
    }
}

export const closeActiveChat = () => {
    return {
        type:'closeActiveChat'
    }
}

export const sendImage = (blob, progressCallback, successCallback) => {
	return (dispatch) => {

		let tmpKey = firebase.database().ref('chats').push().key;

		let fbimage = firebase.storage().ref().child('images').child(tmpKey);

		fbimage.put(blob, {contentType:'image/jpeg'})
			.on('state_changed',

			progressCallback,

			(error)=>{
				alert(error.code);
			},

			()=>{

				fbimage.getDownloadURL().then((url)=>{

					successCallback(url);

				});
				
			})

	}
};

export const sendMessage = (msgType, msgContent, author, activeChat) => {
    return (dispatch) => {
        let currentDate = ''
        let cDate = new Date()

        // YYYY-MM-DD HH:ii:SS
        currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate()
        currentDate += ' '
        currentDate += ((cDate.getHours()<10)?'0'+cDate.getHours():cDate.getHours())
        currentDate += ':'+((cDate.getMinutes()<10)?'0'+cDate.getMinutes():cDate.getMinutes())
        currentDate += ':'+((cDate.getSeconds()<10)?'0'+cDate.getSeconds():cDate.getSeconds())

       let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push()

        switch(msgType){
            case 'text':
                msgId.set({
                    msgType:'text',
                    date:currentDate,
                    m:msgContent,
                    uid:author
                })
                break;
            case 'image':
                msgId.set({
                    msgType:'image',
                    date:currentDate,
                    imgSource:msgContent,
                    uid:author
                })
                break;
        }
    }
}

export const monitorChat = (activeChat) => {
    return (dispatch) => {

        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value', (snapshot) => {
            let arrayMsg = []

            snapshot.forEach((childItem)=>{

                switch(childItem.val().msgType){
                 case 'text':
                    arrayMsg.push({
                        key:childItem.key,
                        msgType:'text',
                        date:childItem.val().date,
                        m:childItem.val().m,
                        uid:childItem.val().uid
                    })
                    break;
                  case 'image':
                    arrayMsg.push({
                        key:childItem.key,
                        msgType:'image',
                        date:childItem.val().date,
                        imgSource:childItem.val().imgSource,
                        uid:childItem.val().uid
                    })
                    break;

                }
            })

            dispatch({
                type:'setActiveChatMessage',
                payload:{
                    'msgs':arrayMsg
                }
            })
        })

    }
}

export const monitorChatOff = (activeChat) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').off()
    }
}