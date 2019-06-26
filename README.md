## React Native boiler plate

### Installation
- Clone this project for use.
- npm install
- Link with firebase project (downlaod google-services.json)
- (optional) Set project name and bundle identifier with [react-native-rename](https://github.com/junedomingo/react-native-rename)

### Command
- run dev
```
npm start
react-native run-android
```

- js bundling
```
npm run bundle-android
```

- generate android release apk
```
npm run release-apk
```


### Feature
- State Manager ([mobx](https://github.com/mobxjs/mobx))
- Router ([react-native-router-flux](https://github.com/aksonov/react-native-router-flux))
- Modal ([react-native-modal](https://github.com/react-native-community/react-native-modal))
- Firebase ([react-native-firebase](https://github.com/invertase/react-native-firebase))
    - default : Core / FCM 
    - You need to setting up google-services.json file(downloaded from firebase project)
- Animation ([react-native-animatable](https://github.com/oblador/react-native-animatable))
- Responsive Screen ([react-native-responsive-screen](https://github.com/marudy/react-native-responsive-screen))
- Splash Screen ([react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen))
- Icons ([react-native-vector-icons](https://github.com/oblador/react-native-vector-icons))
- Messsage Bar ([react-native-message-bar](https://github.com/KBLNY/react-native-message-bar))


### To do
- [ ] Linking iOS modules
