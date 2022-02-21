import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default class MessageItem extends Component {
    
    constructor(props){
        super(props)

        let bgColor = 'rgba(251,109,98,0.26)'
        let align = 'flex-start'
        let txtAlign = 'left'

        if(this.props.data.uid == this.props.me){
            bgColor = 'rgba(221,221,221,0.26)'
            align = 'flex-end'
            txtAlign = 'right'
        }

        this.state = {
            bgColor:bgColor,
            align:align,
            txtAlign:txtAlign,
            dateMsg:this.getFormattedDate(this.props.data.date)
        }

        this.imageClicked = this.imageClicked.bind(this)
    }

    getFormattedDate(originalDate){

        let cDate = new Date()
        let mDate = originalDate.split(' ')
        let todayDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate()

        let newDate = mDate[1].split(':')
        newDate = newDate[0]+':'+newDate[1]

        if(todayDate != mDate[0]){
            let newDateDays = mDate[0].split('-')
            newDate = newDateDays[2]+'/'+newDateDays[1]+'/'+newDateDays[0]+' '+newDate
        }

        return newDate
    } 

    imageClicked() {
		this.props.onImagePress( this.props.data.imgSource );
	}

    render(){
         return( 
            <View style={[MessageItemStyles.area, {alignSelf:this.state.align,backgroundColor:this.state.bgColor}]}>
                {this.props.data.msgType == 'text' &&
                     <Text style={{textAlign:this.state.txtAlign}}>{this.props.data.m}</Text>
                }
                {this.props.data.msgType == 'image' && 
                    <TouchableHighlight onPress={this.imageClicked}>
						<Image style={{width:250,height:250}} source={{uri:this.props.data.imgSource}} />
                    </TouchableHighlight>
                    } 
                <Text style={MessageItemStyles.dateTxt}>{this.state.dateMsg}</Text>
            </View>
         ) 
    } 
}

const MessageItemStyles = StyleSheet.create({
    buttonArea:{
        height:60,
        flex:1,
        justifyContent:'center', 
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:"#CCC"
    },
    area:{
        marginTop:5,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        padding:10,
        maxWidth:'80%',
        borderRadius:15
    },
    dateTxt:{
        fontSize:11,
        textAlign:'right',
        marginTop:10,
    },
	image:{
		width:200,
		height:200
	}
})