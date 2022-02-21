import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { checkLogin } from '../actions/AuthActions'

export class Home extends Component {

    static navigationOptions = {
        title:'',
        headerShown:false
    }

    constructor(props){
        super(props)
        this.state = {} 

        this.signinButton = this.signinButton.bind(this)
        this.signupButton = this.signupButton.bind(this)

    }

    signinButton(){
        this.props.navigation.navigate("SignIn")
    }

    signupButton(){
        this.props.navigation.navigate("SignUp")
    }

    render(){
        return(

            <View style={styles.container}>
                 <Text style={styles.appName}>SophiaChat 1.0</Text>
                <Text style={styles.appLoad}>Seja bem vindo(a)!</Text>

                <View style={styles.buttonArea}>
                    <TouchableHighlight onPress={this.signinButton} style={styles.button}><Text style={styles.buttonTxt}>LOGIN</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.signupButton} style={styles.button}><Text  style={styles.buttonTxt}>CADASTRO</Text></TouchableHighlight>
                 </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
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
    },
    buttonArea:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly',
        marginTop:110
    },
    button:{
        backgroundColor:'#2D3F65',
        width:'40%',
        height:50,
        borderRadius:100,
        borderBottomWidth:1,
        borderBottomColor:'#FB6D62',
        fontFamily:'Rubik-Medium'
    },
    buttonTxt:{
        color:'white',
        fontFamily:'Rubik-Medium',
        fontSize:18,
        alignSelf:'center',
        marginTop:14
    }
})

const mapStateToProps = (state) => {
    return {
        status:state.auth.status
    }
}

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home)
export default HomeConnect