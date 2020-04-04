#!/usr/bin/env node

const chalk = require('chalk');
var inquirer = require('inquirer');
var clear = require('clear');
// clear();

console.log("Lets get some info about your app ...");

var createApp = require('./createApp').createApp;

var questions = [
  /* Pass your questions in here */
  { 
    type: "input", 
    name: "name", 
    message:"Name of your app ?", 
    validate : function(val){return val.length > 0 }
  },
  { 
    type: "checkbox", 
    name: "integrations", 
    message:"Which of following auths you need to integrate?",
    choices : ["Google Login", "Facebook Login"]
  }
]

inquirer
  .prompt(questions)
  .then(async (answers) => {
    console.log(answers);
    await createApp(answers.name, answers);
    console.log(chalk.blue('created app ') + chalk.green(`${answers.name}!`));

  })
  .catch(error => {
    console.log(error);
    
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
