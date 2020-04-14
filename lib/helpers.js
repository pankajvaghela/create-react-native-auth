const fs = require('fs');
const path = require('path');

module.exports = {
  integrations : {
    google : {
        label : "Google Login",
        module : "@react-native-community/google-signin", 
    },
    fb : {
        label : "Facebook Login",
        module : "react-native-fbsdk",
    },
    firebase : {
        label : "Firebase (Push Notification, Dynamic(Deep) Link)",
        module : "@react-native-firebase/app"
    }
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
  }
};