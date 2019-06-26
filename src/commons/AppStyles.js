import {getStatusBarHeight} from "react-native-status-bar-height";
import {widthPercentageToDP, heightPercentageToDP, listenOrientationChange, removeOrientationListener} from "react-native-responsive-screen"

const AppStyles = {
    statusBarHeight:getStatusBarHeight(),
    navHeight:heightPercentageToDP(8),
    tabHeight:heightPercentageToDP(8),
    width : widthPercentageToDP(100),
    height : heightPercentageToDP(100),
    widthDp:(x)=>widthPercentageToDP(x),
    heightDp:(x)=>heightPercentageToDP(x),

    white : '#fff',
    black : '#000',
    transparent : "rgba(0,0,0,0)",
    greyF : "#f0f0f0",
    greyE : "#eee",
    greyD : "#ddd",
    greyC : "#ccc",
    greyB : "#bbb",
    greyA : "#aaa",
    grey9 : "#999",
    grey8 : "#888",
    grey7 : "#777",
    grey6 : "#666",
    grey5 : "#555",
    grey4 : "#444",
    grey3 : "#333",
    red : "#ff5e5e",
    brightRed : "#fb766d",
    blue : "#368fff",
    brightBlue : "#65a4fb",
    yellow : "#ffd133",
    brightYellow : "#ffdf70",
};

export default AppStyles;
