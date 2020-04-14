const fs = require('fs');
const path = require('path');

module.exports = {
  integrations : {
    google : "Google Login",
    fb : "Facebook Login",
    firebase : "Firebase (Push Notification, Deep Linking)"
  },
  firebase:{
    analytics : "Analytics",
    crashlytics : "Crashlytics",
    fcm : "Cloud Messaging (Push Notification)",
    deeplink : "Deep Linking",
    inapp : "In App Messaging"
  },
  getObjectVals : (obj) => Object.keys(obj).map(k => obj[k]),
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