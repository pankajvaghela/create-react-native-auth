const fs = require('fs');
const path = require('path');
var googleSetup = require('./sGoogle');
var fbSetup = require('./sFb');
var firebaseSetup = require('./firebase');
var otpUtilsSetup = require('./otpUtils');
var msAppCenterSetup = require('./msAppCenter');
var reduxSetup = require('./redux');
var navigationSetup = require('./navigation');

const config = {
  integrations : {
    appcenter : {
      label : "Microsoft Appcenter",
      module : " ",
      setup : msAppCenterSetup, 
      enabled : true, 
    },
    firebase : {
      label : "Firebase (Push Notification, Dynamic(Deep) Link)",
      module : "@react-native-firebase/app",
      setup : firebaseSetup,
      enabled : true, 
    },
    google : {
        label : "Google Login",
        module : "@react-native-community/google-signin",
        setup : googleSetup, 
        enabled : true, 
    },
    fb : {
        label : "Facebook Login",
        module : "react-native-fbsdk",
        setup : fbSetup, 
        enabled : true, 
    },
    otpUtils : {
        label : "SMS OTP Verification setup",
        module : "react-native-sms-retriever @twotalltotems/react-native-otp-input",
        setup : otpUtilsSetup, 
        enabled : true, 
    },
    redux : {
        label : "Redux, Redux-thunk, Redux-persist",
        module : "redux redux-thunk redux-logger redux-persist @react-native-community/async-storage redux-devtools-extension/developmentOnly",
        setup : reduxSetup, 
        enabled : true,
    },
    nav : {
        label : "React Navigation",
        module : "@react-navigation/native @react-navigation/stack",
        setup : navigationSetup, 
        enabled : true,
    },
  },
  firebase:{
    analytics : {
        label : "Analytics",
        module : "@react-native-firebase/analytics"
    },
    crashlytics : {
        label : "Crashlytics",
        module : "@react-native-firebase/crashlytics"
    },
    fcm : {
        label : "Cloud Messaging (Push Notification)",
        module : "@react-native-firebase/messaging"
    },
    dynalink : {
        label : "Dynamic(Deep) Linking",
        module : "@react-native-firebase/dynamic-links"
    },
    inapp : {
        label : "In App Messaging",
        module : "@react-native-firebase/in-app-messaging"
    },
  },
  getObjectVals : (obj) => Object.keys(obj).map(k => obj[k].label),
  getLibDir: () => {
    return __dirname;
  },
  getProcessDir: () => {
    return process.cwd();
  },
  existsDir: (filePath) => {
    return fs.existsSync(filePath);
  },
  
};


module.exports = config;