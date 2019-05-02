import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {observer} from "mobx-react";
import {Actions} from "react-native-router-flux";
import {CounterStore} from "../../stores";
import {APPTEXT, COMMON, SCREEN} from "../../commons";

@observer
export default class CounterScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {count} = CounterStore;

        return (
            <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>

                <Text>{APPTEXT.GREETING}</Text>
                <Text style={{margin:COMMON.widthDp(15)}}>{count}</Text>

                <View style={styles.buttonWrapper}>
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
                </View>

            </View>
        )
    }

    _showModal(){
        //Actions.push(SCREEN.MAIN);
        Actions.push(SCREEN.SPINNER_MODAL);
    }
    _showTabs(){
        Actions.push(SCREEN.TABS);
    }

    _add(){
        CounterStore.add();
    }

    _minus(){
        CounterStore.minus();
    }
}


const styles = StyleSheet.create({
    buttonWrapper:{
        flexDirection:"row", justifyContent:"space-evenly", width:COMMON.widthDp(80), marginVertical:10
    },
    button: {
        width:COMMON.widthDp(30), height:COMMON.heightDp(4), alignItems:"center"
    },
    red : {
        backgroundColor:COMMON.red,
    },
    blue : {
        backgroundColor:COMMON.blue,
    },
    grey : {
        backgroundColor:COMMON.grey8
    },
    buttonText: {
        color:COMMON.white, fontSize:COMMON.heightDp(3)
    }
});