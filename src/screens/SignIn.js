import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { checkLogin, changeEmail, changePassword, SignInAction } from '../actions/AuthActions'
import { getChatsList, getContactsList } from '../actions/ChatsActions'
import LoadingItem from '../components/loadingItem'

export class SignIn extends Component {

    static navigationOptions = {
        title:'Entrar',
        headerShown:true
    }

    constructor(props){
        super(props)
        this.state = {loading:false }
    }


    componentDidUpdate(){
        if(this.props.status == 1 && this.props.uid != ''){
            Keyboard.dismiss()
            this.props.getChatsList( this.props.uid ) 
            this.props.getContactsList( this.props.uid )  
            this.props.navigation.navigate("Chats")
        }
    }

    render(){
        return(

            <View style={styles.container}>

                <Text style={{margin:10}}>Digite seu e-mail:</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} /> 
                
                <Text style={{margin:10}}>Digite sua senha:</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} />  

                <TouchableHighlight style={styles.button} onPress={()=>{
                    this.setState({loading:true})
                    this.props.SignInAction(this.props.email, this.props.password, ()=>{this.setState({loading:false})})
                    }}><Text style={styles.buttonTxt}>Entrar</Text></TouchableHighlight>

                    <LoadingItem visible={this.state.loading} />
            </View>

        )
    }
}  

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    input:{
        width:'80%',
        height:50,
        backgroundColor:'#efefef',
        fontSize:23
    },
    button:{
        backgroundColor:'#2D3F65',
        width:'40%',
        height:50,
        borderRadius:100,
        borderBottomWidth:1,
        borderBottomColor:'#FB6D62',
        fontFamily:'Rubik-Medium',
        marginTop:35
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
        uid:state.auth.uid,
        email:state.auth.email,
        password:state.auth.password,
        status:state.auth.status,
    }
}

const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, SignInAction, getChatsList, getContactsList })(SignIn)
export default SignInConnect