import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { SignOut } from '../actions/AuthActions'

export class Config extends Component {
    
    static navigationOptions = {
        title:'Config',
    }

    constructor(props){
        super(props)
        this.state = {} 
        
        this.sair = this.sair.bind(this)
    }

    sair(){
       
        this.props.SignOut()
        
        window.globalNavigator.navigate('Home')
    
    }

    render(){
        return(

            <View style={styles.body}>
            <View style={styles.topBar}> 
                <Text style={styles.chats}>Config.</Text>
                <Text style={styles.recentTxt}>...</Text>
            </View>         
            <View style={styles.border}></View>       
            <View style={styles.container}>
                 <TouchableHighlight onPress={this.sair} style={styles.button}> 
                     <Text style={styles.buttonTxt}>Sair?</Text>
                 </TouchableHighlight> 
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
    },
    button:{
        backgroundColor:'#2D3F65',
        width:'80%',
        height:50,
        borderRadius:100,
        borderBottomWidth:1,
        borderBottomColor:'#FB6D62',
        fontFamily:'Rubik-Medium'
    },
    buttonTxt:{
        fontSize:25,
        color: 'white',
        alignSelf:'center',
        marginTop:7
    }
})

const mapStateToProps = (state) => {
    return {
        status:state.auth.status,
        uid:state.auth.uid
    }
}

const ConfigConnect = connect(mapStateToProps, { SignOut })(Config)
export default ConfigConnect