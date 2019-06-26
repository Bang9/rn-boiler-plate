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
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AppStyles,Const,Screen} from '../../commons';


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
        setTimeout(()=>{
            this.setState({loaded:true},SplashScreen.hide)
        },1000);
    }

    render() {
        const {loaded} = this.state;

        if(!loaded){
            return(
                <View style={{height:AppStyles.height, width:AppStyles.width, backgroundColor:"black"}} />
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
                            key={Screen.MAIN}
                            component={CounterScreen}
                            hideNavBar={false}
                            title={"COUNTER"}
                        />

                        <Tabs
                            key={Screen.TABS}
                            showLabel={true}
                            tabBarPosition={"bottom"}
                            activeTintColor={AppStyles.blue}
                        >
                            <Scene
                                hideNavBar={true}
                                key={Screen.TAB_ONE}
                                icon={(props)=>this.renderTabIcon(Screen.TAB_ONE,props)}
                                component={TabOneScreen}
                                title={"google"}
                            />
                            <Scene
                                hideNavBar={true}
                                key={Screen.TAB_TWO}
                                icon={(props)=>this.renderTabIcon(Screen.TAB_TWO,props)}
                                component={TabTwoScreen}
                                title={"apple"}
                            />
                            <Scene
                                hideNavBar={true}
                                key={Screen.TAB_THREE}
                                icon={(props)=>this.renderTabIcon(Screen.TAB_THREE,props)}
                                component={TabThreeScreen}
                                title={"android"}
                            />
                        </Tabs>
                    </Scene>

                    {/** Modals **/}
                    <Scene
                        key={Screen.SPINNER_MODAL}
                        component={SpinnerModal}
                    />
                </Lightbox>
            </Router>
        );
    }

    renderTabIcon = (tabKey,props) => {
        const {focused, activeTintColor, inactiveTintColor} = props;
        const icons = {
            [Screen.TAB_ONE]:'google',
            [Screen.TAB_TWO]:'apple',
            [Screen.TAB_THREE]:'android'
        };

        return (
            <Icon name={icons[tabKey]} size={20} color={focused ? activeTintColor : inactiveTintColor} />
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

YellowBox.ignoreWarnings(Const.warnIgnore);
