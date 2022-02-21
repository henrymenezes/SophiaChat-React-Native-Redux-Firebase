import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getChatsList, setActiveChat, monitorChat } from '../actions/ChatsActions'
import ChatItem from '../components/ChatsList/ChatItem'

export class ChatsList extends Component {

    static navigationOptions = {
        title:'Chats',
    }

    constructor(props){
        super(props)
        this.state = {loading:true} 

        /*this.props.getChatsList( this.props.uid, () => {
            this.setState({loading:false})
        }) */

        this.chatClick = this.chatClick.bind(this)
    }

    componentDidUpdate(){
        if(this.props.activeChat != ''){
            this.props.navigation.navigate('InternalChat', {title:this.props.activeChatTitle})
        }
    }
 
    chatClick(data){
       this.props.setActiveChat(data.key, data.refName)
            this.props.monitorChat(data.key);
    }

    render(){ 
        return(
            <View style={styles.body}>
                <View style={styles.topBar}> 
                    <Text style={styles.chats}>Chats</Text>
                    <Text style={styles.recentTxt}>Recentes</Text>
                </View>         
                <View style={styles.border}></View>       
                <View style={styles.container}>
                    {/*this.state.loading && <ActivityIndicator size="large" color="#0000ff" />*/}
                    <FlatList 
                        data={this.props.chats}
                        renderItem={({item})=>{
                        return( 
                            <ChatItem 
                                data={item}
                                onPress={this.chatClick} />
                            )
                        }}/>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'#fff',
        flex:1,
    },
    container:{
        margin:10,
    },
    topBar:{
        width:'100%',
        marginLeft:33,
        marginTop:46,
    },
    chats:{
        fontFamily:'Rubik-Regular',
        fontSize:48,
        flexDirection: 'column',
        color:'#2D3F65',
        marginLeft:-4
    },
    recentTxt:{
        fontFamily:'Rubik-Regular',
        fontSize:20,
        color:'#FB6D62',
        marginTop:15,
    },
    border:{
        height:1,
        width:'100%',
        backgroundColor:'black',
        opacity:0.05,
        marginTop:10
    }
})

const mapStateToProps = (state) => {
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chats.activeChat,
        activeChatTitle:state.chats.activeChatTitle,
        chats:state.chats.chats
    }
}

const ChatsListConnect = connect(mapStateToProps, { getChatsList, setActiveChat, monitorChat })(ChatsList)
export default ChatsListConnect