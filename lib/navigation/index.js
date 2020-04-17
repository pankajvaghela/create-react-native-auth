
var shell = require('shelljs');
var chalk = require('chalk');

async function navigationSetup(options){

  console.log("\nReact Navigation Setup start ...");

  console.log(chalk.dim('Copying navigation (routes) files to src folder... '));
  shell.cp('-R', `${__dirname}/routes/`,`./src/routes/` );
  console.log('setup for '+chalk.green("React Navigation setup done."));
    
}

module.exports = navigationSetup;
