/**
 * Created by bang9 on 2017-08-03.
 */

import * as firebase from 'react-native-firebase'

/* https://console.firebase.google.com/u/1/project/{app-name}/settings/cloudmessaging/ */
const SERVER_KEY = "";
const SENDER_ID = "";
const API_URL = "https://fcm.googleapis.com/fcm/send";

/**
 * - CLASS
 * Message -> data-only
 * Notification -> notification-only / notification+data
 *
 * - PUSH ICON SETTING
 * default icon        => drawble/ic_stat_ic_icon
 * custom large icon   => mipmap/ic_large
 * custom small icon   => mipmap/ic_small
 *
 * */

class Push {

    /***** Push Settings *****/
    setPushChannel(){
        const channel = new firebase.notifications.Android.
        Channel("default_id", "앱 알림", 3).setDescription("default notification channel");
        firebase.notifications().android.createChannel(channel);
    }

    async requestPushPermission(){
        const isEnabled = await firebase.messaging().hasPermission();

        if(!isEnabled){
            const granted = await firebase.messaging().requestPermission();

            if(granted){
                console.log("granted")
            }
        }
    }

    getToken(callback){
        return firebase.messaging().getToken()
            .then(token => {
                if (token && callback) {
                    callback(token)
                }
            })
    }

    deleteToken(callback){
        return firebase.messaging().deleteToken()
            .then(()=>{
                if(callback)
                    callback()
            })
    }

    onTokenRefresh(){
        firebase.messaging().onTokenRefresh((token)=>{
            if (token) {
            }
        })
    }

    subscribeTopic(topic){
        firebase.messaging().subscribeToTopic(topic)
    };

    unsubscribeTopic(topic){
        firebase.messaging().unsubscribeFromTopic(topic)
    };


    /***** Push Handler *****/
    //message to notification
    showNotification(message){
        const notification = JSON.parse(message.data.notification);
        console.log("on message with show notification",notification);

        const newPush = new firebase.notifications.Notification(notification)
            .setNotificationId(notification.Id || "default_notification_id")
            .setTitle(notification.title || "기본타이틀")
            .setBody(notification.body || "기본바디")
            .setData(notification.data || {})
            .setSound(notification.sound || "default")
            .android.setSmallIcon(notification.icon || "ic_stat_ic_notification")
            .android.setLargeIcon(notification.large_icon || "ic_launcher")
            .android.setAutoCancel(true)
            .android.setPriority(firebase.notifications.Android.Priority.Max)
            .android.setChannelId(notification.channelId || "default_id");

        console.log('new push notification',newPush);
        firebase.notifications().displayNotification(newPush);
    }


    //message
    onMessage(callback){
        return firebase.messaging().onMessage((msg)=>{
            callback(msg)
        })
    }

    //notification을 foreground 상태에서 받음
    onNotification(){
        return firebase.notifications().onNotification((notification)=>{
            notification.android.setChannelId("default_id");
            firebase.notifications().displayNotification(notification);
        })
    }

    //notification으로 background 상태의 app open
    backgroundOpenNotification(){
        return firebase.notifications().onNotificationOpened((notificationOpen)=>{
            const action = notificationOpen.action;
            const notification = notificationOpen.notification;

            console.log('background',notification)
        })
    }

    //notification으로 closed 상태의 app open
    closedOpenNotification(){
        return firebase.notifications().getInitialNotification().then((notificationOpen)=>{
                if (notificationOpen) {
                    const action = notificationOpen.action;
                    const notification = notificationOpen.notification;

                    console.log('closed',notificationOpen)
                }
            })
    }

    testPush(){
        const notification = new firebase.notifications.Notification()
            .setNotificationId('id')
            .setTitle('title')
            .setBody('contents')
            .setData({
                key:'value',
                key2:'value2'
            })
            .android.setSmallIcon('ic_stat_ic_notification')
            .android.setPriority(firebase.notifications.Android.Priority.Max);
        firebase.notifications().displayNotification(notification);
    }

    sendToUser(token){
        try {
            let body = {
                "to": token,
                "data": {
                    "notification": {
                        "title": `${"TEST"}님이 보낸 메세지`,
                        "body": "안녕하세요",
                        "large_icon": `${"image or url"}`, // Android only
                        "icon": "ic_stat_hi", // as FCM payload, you can replace icon in mipmap
                        "sound": "default",
                        "show_in_foreground": true,
                        "data":{
                            "hi": "hi",
                        }
                    },
                    "priority": "high",
                }
            };

            this._send(JSON.stringify(body), "notification-to", ToastAndroid.show('전송되었습니다.',ToastAndroid.SHORT))
        }
        catch(err){
            console.log('notification to error',err)
        }
    }

    _send(body, type, callback) {
        let headers = new Headers({
            "Content-Type": "application/json",
            "Content-Length": parseInt(body.length),
            "Authorization": "key=" + SERVER_KEY
        });

        fetch(API_URL, { method: "POST", headers, body })
            .then(response =>{
                console.log("Send " + type + " response", response);
                callback;
            })
            .catch(error => console.log("Error sending " + type, error));
    }
}

export default new Push();