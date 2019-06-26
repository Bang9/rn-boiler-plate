import {MessageBarManager} from "react-native-message-bar";
import {AppStyles} from "../commons";

const MESSAGE_TYPE = {
    SUCCESS:'success',
    INFO:'info',
    WARN:'warning',
    ERROR:'error',
    EXTRA:'extra'
};

const success = (title,message) => {
    return base(title,message,MESSAGE_TYPE.SUCCESS);
};

const error = (title,message) => {
    return base(title,message,MESSAGE_TYPE.ERROR);
};

const warn = (title,message) => {
    return base(title,message,MESSAGE_TYPE.WARN);
};

const info = (title,message) => {
    return base(title,message,MESSAGE_TYPE.INFO);
};

const extra = (title,message) => {
    return base(title,message,MESSAGE_TYPE.EXTRA);
};

const base = (title = '', message = '', type = MESSAGE_TYPE.INFO) => {
    MessageBarManager.showAlert({
        title: title,
        message: message,
        alertType: type,
        titleStyle:{fontSize:18, fontWeight:'bold'},
        messageStyle:{fontSize:15},
        position:'bottom',
        animationType:'SlideFromBottom',
        stylesheetInfo : { backgroundColor : AppStyles.blue, strokeColor : AppStyles.blue, titleColor:AppStyles.white, messageColor:AppStyles.white },
        stylesheetSuccess : { backgroundColor : AppStyles.green, strokeColor : AppStyles.green, titleColor:AppStyles.white, messageColor:AppStyles.white },
        stylesheetWarning : { backgroundColor : AppStyles.yellow, strokeColor : AppStyles.yellow, titleColor:AppStyles.white, messageColor:AppStyles.white },
        stylesheetError : { backgroundColor : AppStyles.red, strokeColor : AppStyles.red, titleColor:AppStyles.white, messageColor:AppStyles.white },
        stylesheetExtra : { backgroundColor : 'black', strokeColor : 'gray', titleColor:AppStyles.white, messageColor:AppStyles.white },
    })
};

export default {
    success,
    error,
    warn,
    info,
    extra
}
