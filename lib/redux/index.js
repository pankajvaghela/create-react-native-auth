
var shell = require('shelljs');
var chalk = require('chalk');

async function reduxSetup(options){

  console.log("\nRedux Setup start ...");

  console.log(chalk.dim('Copying redux files to src folder... '));
  shell.cp('-R', `${__dirname}/redux/`,`./src/redux/` );
  console.log('setup for '+chalk.green("Redux, Thunk, Persist setup done."));
    
}

module.exports = reduxSetup;
