import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import Reducers from './src/Reducers'

import Preload from './src/screens/Preload'
import Home from './src/screens/Home'
import Chats from './src/screens/Chats'
import SignUp from './src/screens/SignUp'
import SignIn from './src/screens/SignIn'
//import { LogBox } from 'react-native'

//LogBox.ignoreAllLogs(true)

let store = createStore(Reducers, applyMiddleware(ReduxThunk))

const Navegador = createStackNavigator({
  Preload:{
    screen:Preload
  },
  Home:{
    screen:Home
  },
  Chats:{
    screen:Chats,  navigationOptions: {
        headerShown :false, 
      }
  },
  SignUp:{
    screen:SignUp
  },
  SignIn:{
    screen:SignIn
  }
})

const AppContainer = createAppContainer(Navegador)

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

