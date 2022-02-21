import React, { Component } from 'react'
import {Image} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
//import { connect } from 'react-redux'

//import ChatsStack from './ChatsStack'
import ContactsList from './ContactsList'
import Config from './Config'

import ChatsList  from './ChatsList'
import InternalChat from './InternalChat'
//chatsstack

const ChatsNavigator = createBottomTabNavigator({
    ChatsList:{
        screen:ChatsList,
        navigationOptions:{
            title:'Chats',
            tabBarIcon: () => (
                <Image source={require('../assets/images/chat-2-128.png')} style={{width:28,height:28}} />
              )
        }
    },
    InternalChat:{
        screen:InternalChat,
        navigationOptions:{
           headerShown :false, 
           tabBarVisible:false,
           tabBarButtonComponent: () => null,
        }
    },

    ContactsList:{
        screen:ContactsList,
        navigationOptions:{
            tabBarIcon: () => (
                <Image source={require('../assets/images/chat-128.png')} style={{width:28,height:28}} />
              )
        }
    },
    Config:{
        screen:Config,
        navigationOptions:{
            tabBarIcon: () => (
                <Image source={require('../assets/images/settings-19-128.png')} style={{width:28,height:28}} />
              )
        }
    }, 
},  { 
    initialRouteName: 'ChatsList',
}, {  
    tabBarOptions: { 
      showIcon: true ,
    }, 
}) 

export default createAppContainer(ChatsNavigator)