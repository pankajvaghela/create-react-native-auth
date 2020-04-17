
var shell = require('shelljs');
var chalk = require('chalk');

async function otpUtilSetup(options){

  console.log("\nOtp Utils Setup start ...");

  console.log(chalk.dim('Copying otpUtils files to src folder... '));
  shell.cp('-R', `${__dirname}/otpUtils/`,`./src/otpUtils/` );
  console.log('setup for '+chalk.green("OTP verification setup done."));
    
}

module.exports = otpUtilSetup;
