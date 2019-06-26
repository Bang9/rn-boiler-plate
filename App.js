import React, {Component} from 'react';
import Routes from "./src/screens/root/Routes";
import {View, StatusBar} from "react-native";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <RoutesWrapper style={{flex:1, paddingTop:StatusBar.currentHeight}}>
                <Routes/>
            </RoutesWrapper>
        );
    }
}

const RoutesWrapper = props => {
    const {children, ...rest} = props;

    return(
        <View {...rest}>
            <StatusBar translucent={true}/>
            {children}
        </View>
    )
};
