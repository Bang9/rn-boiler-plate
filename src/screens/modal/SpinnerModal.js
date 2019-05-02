import React, {Component} from "react";
import {View, ActivityIndicator, Text} from "react-native";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";

import {COMMON} from "../../commons";

export default class SpinnerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible:true
        }
    }

    render() {
        return (
            <View>
                <Modal
                    useNativeDriver={true}
                    onModalHide={Actions.pop}
                    isVisible={this.state.isVisible}
                >
                    <View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
                        <ActivityIndicator size={"large"} color={COMMON.blue} />

                        <Text onPress={this._hideModal} style={{color:COMMON.white, padding:10}}>
                            CLOSE
                        </Text>
                    </View>
                </Modal>
            </View>
        )
    }

    _hideModal = () => {
        this.setState({
            isVisible:false
        })
    }
}