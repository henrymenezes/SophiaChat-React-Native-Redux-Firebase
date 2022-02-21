import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { getContactsList, setActiveChat, createChat, monitorChat } from '../actions/ChatsActions'
import ContactItem from '../components/ContactsList/ContactItem'

export class ContactsList extends Component {

    static navigationOptions = {
        title:'Mundo Social',
    }

    constructor(props){
        super(props)
        this.state = {loading:true} 
       
        this.contactClick = this.contactClick.bind(this)
    }

    contactClick(item){

        //previne criação de chat duplicado.
        let statusY = false
        for(var i in this.props.chats){
            if(statusY == false){
                if(item.key == this.props.chats[i].refUid){ 

                    this.props.monitorChat(this.props.chats[i].key);
                    this.props.setActiveChat(this.props.chats[i].key, this.props.chats[i].refName)
                    this.props.navigation.navigate('ChatsList')
                    statusY = true
                }   
            }
        } 

        if(!statusY){
            this.props.createChat(  this.props.uid, item.key, this.props.name, item.name, (callback) => {
                this.props.monitorChat(callback)
            })
            this.props.navigation.navigate('ChatsList')
        }

     } 

    render(){
        return(
            <View style={styles.body}>
            <View style={styles.topBar}> 
                <Text style={styles.chats}>Mundo Social</Text>
                <Text style={styles.recentTxt}>Inicie um Chat..</Text>
            </View>         
            <View style={styles.border}></View>       
            <View style={styles.container}>
                {/*this.state.loading && <ActivityIndicator size="large" color="#0000ff" />*/}
                    <FlatList 
                        data={this.props.contacts}
                        renderItem={({item})=>{
                            return (
                                <View>
                                <ContactItem data={item} onPress={this.contactClick} />
                                </View>
                            )
                        } } />
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
        uid:state.auth.uid,
        name:state.auth.name,
        contacts:state.chats.contacts,
        chats:state.chats.chats
        }
}

const ContactsListConnect = connect(mapStateToProps, { getContactsList, createChat, setActiveChat, monitorChat })(ContactsList)
export default ContactsListConnect