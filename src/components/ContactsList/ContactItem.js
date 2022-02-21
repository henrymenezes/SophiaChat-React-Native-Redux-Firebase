import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native'

export default class ContactItem extends Component {
    
    constructor(props){
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        this.props.onPress(this.props.data)
    }

    render(){
         return(
                <TouchableHighlight underlayColor="#ddd" style={ContactItemStyles.buttonArea} onPress={this.onClick}>
                <View style={ContactItemStyles.textArea}>

                    <Image source={require('../../assets/images/60371561-878d-4738-a0c5-969635eba49a.png')} style={{width:50,height:50,alignSelf:'center'}}/>
                <View style={ContactItemStyles.body}> 
                    <Text style={ContactItemStyles.title}>{this.props.data.name}</Text>
                    <Text style={ContactItemStyles.subtitle}>Clique p/ Iniciar um Chat!</Text>
                </View>
                </View>

                </TouchableHighlight>
         )
    }
}

const ContactItemStyles = StyleSheet.create({
    buttonArea:{
        height:60,
        flex:1,
        justifyContent:'center',
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:"#CCC",
        marginBottom:10
    },
    buttonArea:{
        height:70,
        flex:1,
        justifyContent:'center',
        paddingLeft:15,
        width:'100%'
    },
    title:{
        color:"#2D3F65",
        fontSize:16,
        fontFamily:'Rubik-Medium',   
    },
    body:{
        flexDirection:'column',
        marginLeft:20,
        paddingTop:15
    },
    subtitle:{
        color:"#676767",
        fontSize:12,
        fontFamily:'Rubik-Medium',
        paddingTop:3
    },
    textArea:{
        flexDirection:'row',
        width:'100%',
        flex:1,
    },
})