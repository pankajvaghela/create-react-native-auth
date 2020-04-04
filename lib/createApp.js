#!/usr/bin/env node

var shell = require('shelljs');
var chalk = require('chalk');

var defaultOptions = {
  integrations : []
};

async function createApp(name, options = defaultOptions){
  options = Object.assign({},defaultOptions, options);

  console.log("Creating Project ...");
  console.log("with ", options.integrations.toString().replace(",", " & "));
  
  shell.mkdir(`${name}`);
  shell.cd(`${name}`);

  // shell.echo(process.cwd());
  // shell.echo(__dirname);

  shell.exec(`npm init -y`);
  // console.log("React native init start ...");  
  // shell.exec(`npx react-native init ${name}`);
  // console.log("react native init end ...");

  console.log(chalk.blue('Copying files ... '));

  shell.cp('-R', `${__dirname}/setup/`,`./src/` );

}


module.exports.createApp = createApp;