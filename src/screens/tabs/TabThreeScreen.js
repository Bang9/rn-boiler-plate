import {observer} from "mobx-react"
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

@observer
export default class TabThreeScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>{this.constructor.displayName}</Text>
            </View>
        )
    }
}