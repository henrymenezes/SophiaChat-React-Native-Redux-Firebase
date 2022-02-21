import React, { Component } from 'react'
import { Modal, View, Text, Image, StyleSheet, TouchableHighlight, BackHandler, FlatList, TextInput, ActivityIndicator } from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack' 
import { connect } from 'react-redux'

import { setActiveChat, sendMessage, sendImage, monitorChat, monitorChatOff, closeActiveChat } from '../actions/ChatsActions'
import MessageItem from '../components/InternalChat/MessageItem'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import ReactNativeBlobUtil from 'react-native-blob-util'

window.XMLHttpRequest = ReactNativeBlobUtil.polyfill.XMLHttpRequest
window.Blob = ReactNativeBlobUtil.polyfill.Blob
const Fetch = ReactNativeBlobUtil.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()

export class InternalChat extends Component {

    static navigationOptions = ({navigation}) => ({
        //title:navigation.state.params.title,
        headerLeft: ()=>(
            <HeaderBackButton
            onPress={() => { navigation.state.params.backFunction() }} />
        )
    })

    constructor(props, {navigation}){
        super(props)
        this.state = {
            inputText:'',
            pct:0,
            loading:true,
            modalVisible:false,
			modalImage:null
        } 
        
        this.back = this.back.bind(this)
        this.sendMsg = this.sendMsg.bind(this)
        this.chooseImage = this.chooseImage.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
		this.imagePress = this.imagePress.bind(this);

    }

    componentDidUpdate(){
        if(this.props.activeChatMessages != []){
            if(this.state.loading){
                let state = this.state
                state.loading = false
                this.setState(state)
            }
        }else{
            if(!this.state.loading){
                let state = this.state
                state.loading = true
                this.setState(state)
            }
        } 
    }

    componentDidMount(){
        this.props.navigation.setParams({backFunction:this.back})
        BackHandler.addEventListener('hardwareBackPress', this.back)
    }

    componentWillUnmount(){ 
        BackHandler.removeEventListener('hardwareBackPress', this.back)
        let state = this.state
        state.loading = true
        this.setState(state)
    }

    back(){
        this.props.monitorChatOff(this.props.activeChat)

        this.props.closeActiveChat();
        this.props.navigation.goBack()

        return true
    }

    setModalVisible(status) {
		let state = this.state;
		state.modalVisible = status;
		this.setState(state);
	}

	imagePress(img) {
		let state = this.state;
		state.modalImage = img;
		this.setState(state);

		this.setModalVisible(true);
	}

    sendMsg(){
        let txt = this.state.inputText

        let state = this.state
        state.inputText = ''
        this.setState(state) 

        this.props.sendMessage('text', txt, this.props.uid, this.props.activeChat)

    }

	chooseImage() {
			
		launchImageLibrary({}, (r)=>{
			if(r.assets[0].uri) {
					
				let uri = r.assets[0].uri.replace('file://', '');

				ReactNativeBlobUtil.fs.readFile(uri, 'base64')
					.then((data)=>{
						return ReactNativeBlobUtil.polyfill.Blob.build(data, {type:'image/jpeg;BASE64'});
					})
					.then((blob)=>{
						this.props.sendImage(
							blob,
							(snapshot)=>{
								let pct = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;

								let state = this.state;
								state.pct = pct;
								this.setState(state);
							},
							(imgName)=>{
								let state = this.state; 
								state.pct = 0;
								this.setState(state);

							    this.props.sendMessage('image', imgName, this.props.uid, this.props.activeChat);
							}
						);

					});

			}
		});

	}

    render(){
        const { params } = this.props.navigation.state;
        return(

            <View style={styles.container}>
                <View style={styles.title}>

                     <Image source={require('../assets/images/60371561-878d-4738-a0c5-969635eba49a.png')} style={{width:50,height:50,alignSelf:'center'}}/>

                    <View style={{flexDirection:'column'}}>
                    <Text style={styles.titleTxt}>{params.title}</Text>
                    <Text style={styles.SubtitleTxt}>Online</Text>
                    </View>

                </View>

                {this.state.loading && <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                    ref={(ref)=>{ this.chatArea = ref }}
                    onContentSizeChange={()=>{ this.chatArea.scrollToEnd({animated:true}) }}
                    onLayout={()=>{ this.chatArea.scrollToEnd({animated:true}) }}
                    style={styles.chatArea}
                    data={this.props.activeChatMessages}
                    renderItem={({item})=><MessageItem data={item} me={this.props.uid} onImagePress={this.imagePress}/>}
                />
                {this.state.pct > 0 &&
					<View style={styles.imageTmp}>
						<View style={[{width:this.state.pct+'%'}, styles.imageTmpBar]}></View>
					</View>
				}
                  <View style={styles.sendArea}>
					<TouchableHighlight style={styles.imageButton} onPress={this.chooseImage}>
						<Image style={styles.imageBtnImage} source={require('../assets/images/new_image.png')} />
					</TouchableHighlight>
					<TextInput style={styles.sendInput} placeholder="Escreva aqui a sua mensagem..." value={this.state.inputText} onChangeText={(inputText)=>this.setState({inputText})} />
					<TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
						<Image style={styles.sendImage} source={require('../assets/images/send.png')} />
					</TouchableHighlight>
				</View>

                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
					<TouchableHighlight style={styles.modalView} onPress={()=>{ this.setModalVisible(false) }}>
						<Image resizeMode="contain" style={styles.modalImage} source={{uri:this.state.modalImage}} />
					</TouchableHighlight>
				</Modal>
            </View>

        )
    }
}

const styles = StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    title:{
        height:65,
        backgroundColor:'#fff',
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        marginBottom:15,
        flexDirection:'row',
    },
    titleTxt:{
        fontSize:17
        ,textAlign:'left',
        color:'#2D3F65',
        marginTop:12,
        marginLeft:12,
        fontFamily:'Rubik-Medium'
    },
    SubtitleTxt:{
        fontSize:12
        ,textAlign:'left',
        color:'#676767',
        marginTop:5,
        marginLeft:14,
        fontFamily:'Rubik-Medium',
    },
    chatArea:{
        flex:1,
        backgroundColor:'#fff',
    },
    sendArea:{
        height:90,
        backgroundColor:'rgba(221,221,221,0.26)',
        flexDirection:'row'
    },



    sendInput:{
        height:47,
        flex:1,
        backgroundColor:'white',
        marginTop:20
    },
    sendButton:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:17
    },
    imageButton:{
		width:30,
		height:30,
		justifyContent:'center',
		alignItems:'center',
        marginTop:27,
        marginLeft:7,
        marginRight:7
	},
	sendImage:{
		width:30,
		height:30
	},
	imageBtnImage:{
		width:30,
		height:30
	},



	imageTmp:{
		height:10
	},
	imageTmpBar:{
		height:10,
		backgroundColor:'#FB6D62'
	},
    modalView:{
		backgroundColor:'#000000',
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	modalImage:{
		width:'100%',
		height:'100%'
	}
})

const mapStateToProps = (state) => {
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chats.activeChat,
        activeChatMessages:state.chats.activeChatMessages
    }
}

const InternalChatConnect = connect(mapStateToProps, { setActiveChat, monitorChat, monitorChatOff, sendMessage, sendImage, closeActiveChat })(InternalChat)
export default InternalChatConnect