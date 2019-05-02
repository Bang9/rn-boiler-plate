import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    View,
    ToastAndroid,
    Alert,
    AppState,
    YellowBox,
    BackHandler,
    NetInfo,
    Image
} from "react-native";
import {Actions,Scene,Router,Lightbox,Tabs} from "react-native-router-flux";
import {observer} from "mobx-react/native";

import {COMMON,CONST,SCREEN} from '../../commons';

/** Store **/
import {CommonStore} from "../../stores";

/** Screens - Main **/
import CounterScreen from "../main/CounterScreen";

/** Screens - Modals **/
import SpinnerModal from "../modal/SpinnerModal";
import TabOneScreen from "../tabs/TabOneScreen";
import TabThreeScreen from "../tabs/TabThreeScreen";
import TabTwoScreen from "../tabs/TabTwoScreen";


@observer
export default class Routes extends Component {
    constructor(props){
        super(props);
        this.state={
            loaded : false,
        };

        this.appState = "";
        this.backPressedTime = 0;
    }

    componentDidMount(){
        this._someLoadingProgress();

        AppState.addEventListener('change', this._appStateHandler);
        NetInfo.isConnected.addEventListener('connectionChange',this._disconnectHandler);
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this._appStateHandler);
        NetInfo.isConnected.removeEventListener("connectionChange",this._disconnectHandler);
    }

    _someLoadingProgress(){
        setTimeout(()=>{this.setState({loaded:true})},500);
    }

    render() {
        const {loaded} = this.state;

        if(!loaded){
            //TODO:splash screen hide here
            return(
                <View style={{height:COMMON.height, width:COMMON.width, backgroundColor:"black"}} />
            )
        }

        return (
            <Router
                wrapBy={observer}
                sceneStyle={styles.routerScene}
                backAndroidHandler={this._backHandler}
            >
                <Lightbox>
                    <Scene
                        key={"root"}
                        sceneStyle = {styles.scene}
                        hideNavBar={true}
                    >
                        {/** Screens **/}
                        <Scene
                            initial={true}
                            key={SCREEN.MAIN}
                            component={CounterScreen}
                        />

                        <Tabs
                            key={SCREEN.TABS}
                            showLabel={true}
                            tabBarPosition={"bottom"}
                            activeTintColor={COMMON.blue}
                        >
                            <Scene
                                hideNavBar={true}
                                key={SCREEN.TAB_ONE}
                                icon={(props)=>this.renderTabIcon(SCREEN.TAB_ONE,props)}
                                component={TabOneScreen}
                                title={"TAB1"}
                            />
                            <Scene
                                hideNavBar={true}
                                key={SCREEN.TAB_TWO}
                                icon={(props)=>this.renderTabIcon(SCREEN.TAB_TWO,props)}
                                component={TabTwoScreen}
                                title={"TAB2"}
                            />
                            <Scene
                                hideNavBar={true}
                                key={SCREEN.TAB_THREE}
                                icon={(props)=>this.renderTabIcon(SCREEN.TAB_THREE,props)}
                                component={TabThreeScreen}
                                title={"TAB3"}
                            />
                        </Tabs>
                    </Scene>

                    {/** Modals **/}
                    <Scene
                        key={SCREEN.SPINNER_MODAL}
                        component={SpinnerModal}
                    />
                </Lightbox>
            </Router>
        );
    }

    renderTabIcon = (tabKey,props) => {
        let icon;

        switch(tabKey){
            case SCREEN.TAB_ONE:
                icon = require("../../images/tab_1.png");
                break;
            case SCREEN.TAB_TWO:
                icon = require("../../images/tab_2.png");
                break;
            case SCREEN.TAB_THREE:
                icon = require("../../images/tab_3.png");
                break;
        }

        return (
            <Image
                style={[
                    styles.tabIcon,
                    props.focused ?
                        {tintColor:props.activeTintColor} :
                        {tintColor:props.inactiveTintColor}
                ]}
                source={icon}
                resizeMode={"contain"}
            />
        )
    };


    /** Handlers **/
    _backHandler = () => {
        if(Actions.currentScene.match(/main/)){
            if(Date.now() > this.backPressedTime+2000){
                this.backPressedTime=Date.now();

                if(Platform.OS === "android")
                    ToastAndroid.show("뒤로 버튼을 한번 더 누르면 종료됩니다.", ToastAndroid.SHORT);
                return true;
            }else{
                return this._exitApp();
            }
        } else {
            try {
                Actions.pop();
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    _disconnectHandler = (connected) => {
        return CommonStore.onChangeInternetState(connected)
    };

    _appStateHandler = (nextAppState) => {
        if (this.state.isLoaded && this.appState === 'background' && nextAppState === 'active') {
            // console.log("LOCK : ",Actions.currentScene);
            // if(!Actions.currentScene.match(/screen|screen2|screen3/)){
            //  can some screen locking!
            // }
        }
        this.appState = nextAppState
    };

    /** Functions **/
    _exitApp = () => {
        Platform.OS === 'android' ?
            BackHandler.exitApp() :
            alert("ios, exit app")
    };
}

const styles = StyleSheet.create({
    routerScene: {
        flex :1,
        backgroundColor:"#fff"
    },
    scene: {
        backgroundColor:"#fff"
    },
    tabIcon : {
        width:20,
        height:20
    }
});

YellowBox.ignoreWarnings(CONST.warnIgnore);