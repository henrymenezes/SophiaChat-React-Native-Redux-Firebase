import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getChatsList, getContactsList } from '../actions/ChatsActions'
import { checkLogin } from '../actions/AuthActions'


export class Preload extends Component {

    static navigationOptions = {
        title:'',
        headerShown:false
    }

    constructor(props){
        super(props)
        this.state = {} 

        this.props.checkLogin()
        this.directPages = this.directPages.bind(this)

        window.globalNavigator = this.props.navigation
    }

directPages(){

    switch(this.props.status){
        case 1: 
            this.props.getChatsList( this.props.uid ) 
            this.props.getContactsList( this.props.uid ) 
            this.props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Chats'})
                ]
            })) 

            break;
        case 2:

            this.props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})
                ]
            }))
            
            break;

    }
}

    componentDidMount(){
        this.directPages()
    }

    componentDidUpdate(){
        this.directPages()
    }

    render(){
        return( 

            <View style={styles.container}>
                <Text style={styles.appName}>SophiaChat 1.0</Text>
                <Text style={styles.appLoad}>Carregando...</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    appName:{
        fontSize:30,
        color:'#2D3F65',
        marginBottom:20,
        fontFamily:'Rubik-Medium'
    },
    appLoad:{
        color:'#FB6D62',
        fontFamily:'Rubik-Medium'
    }
})

const mapStateToProps = (state) => {
    return {
        status:state.auth.status,
        uid:state.auth.uid
    }
}

const PreloadConnect = connect(mapStateToProps, { checkLogin, getChatsList, getContactsList })(Preload)
export default PreloadConnect