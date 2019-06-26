import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {observer} from "mobx-react";
import {Actions} from "react-native-router-flux";
import { MessageBarManager } from 'react-native-message-bar';

import {CounterStore} from "../../stores";
import {AppText, AppStyles, Screen} from "../../commons";
import MessageControl from "../../utils/MessageControl";

@observer
export default class CounterScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {count} = CounterStore;

        return (
            <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>

                <Text>{AppText.GREETING}</Text>
                <Text style={{margin:AppStyles.widthDp(15)}}>{count}</Text>

                <View style={styles.counterWrapper}>
                    <TouchableOpacity
                        onPress={this._add}
                        style={[styles.button, styles.blue]}>
                        <Text style={styles.buttonText}> + </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._minus}
                        style={[styles.button, styles.red]}>
                        <Text style={styles.buttonText}> - </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={[styles.button, styles.grey]} onPress={this._showModal} >
                        <Text style={styles.buttonText}>MODAL</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.button, styles.grey]} onPress={this._showTabs} >
                        <Text style={styles.buttonText}>TABS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.grey]} onPress={this._showAlert} >
                        <Text style={styles.buttonText}>ALERT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    _showModal(){
        //Actions.push(SCREEN.MAIN);
        Actions.push(Screen.SPINNER_MODAL);
    }
    _showTabs(){
        Actions.push(Screen.TABS);
    }
    _showAlert(){
        MessageControl.info('Message','hello this is bottom message bar')
    }

    _add(){
        CounterStore.add();
    }

    _minus(){
        CounterStore.minus();
    }
}


const styles = StyleSheet.create({
    counterWrapper:{
        flexDirection:'row', justifyContent:"space-evenly", width:AppStyles.widthDp(80), marginVertical:10
    },
    buttonWrapper:{
        alignItems:'center', justifyContent:"space-evenly", width:AppStyles.widthDp(80), marginVertical:10
    },
    button: {
        width:AppStyles.widthDp(30), height:AppStyles.heightDp(4), alignItems:"center", margin:5
    },
    red : {
        backgroundColor:AppStyles.red,
    },
    blue : {
        backgroundColor:AppStyles.blue,
    },
    grey : {
        backgroundColor:AppStyles.grey8
    },
    buttonText: {
        color:AppStyles.white, fontSize:AppStyles.heightDp(3)
    }
});
