var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');


function firebaseSetup(options){

  const {firebase_service} = options;

  console.log("\nFirebase Setup start ...");

  shell.exec("yarn add @react-native-firebase/app");
  console.log('Node Module '+chalk.green("@react-native-firebase/app") +' installed.');

  if(firebase_service.fcm){
    shell.exec("yarn add @react-native-firebase/messaging");
    console.log('Node Module '+chalk.green("@react-native-firebase/messaging") +' installed.');

    console.log(chalk.dim('Copying fcm files to src folder... '));
    shell.cp('-R', `${__dirname}/fcm/`,`./src/firebase/fcm` );
    console.log('setup for '+chalk.green("FCM, PushNotification completed."));
  }

}

module.exports = firebaseSetup;
