var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

function firebaseSetup(options, helpers){

  console.log("\nFirebase Setup start ...");

  if(options.firebase_services.includes(helpers.firebase.fcm.label)){
    console.log(chalk.dim('Copying fcm files to src folder... '));
    shell.cp('-R', `${__dirname}/fcm/`,`./src/firebase/fcm/` );
    console.log('setup for '+chalk.green("FCM, PushNotification done."));
  }

  if(options.firebase_services.includes(helpers.firebase.dynalink.label)){
    console.log(chalk.dim('Copying dynamic link files to src folder... '));
    shell.cp('-R', `${__dirname}/dynalink/`,`./src/firebase/dynalink/` );
    console.log('setup for '+chalk.green("Dynamic links done."));
  }

}

module.exports = firebaseSetup;
