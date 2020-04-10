"use strict";

var fs = require('fs-extra');
var chalk = require('chalk');
// const utils = require('./util');


function fbAppGradlePatch(buildGradlePath) {

  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

  buildGradle = dependencyPatch(buildGradle);

  fs.writeFileSync( buildGradlePath, buildGradle, 'utf8' );

  console.log(chalk.green(`Fb: ${buildGradlePath} patched.`));  
}

    
//implementation 'com.facebook.android:facebook-android-sdk:[5,6)'
function dependencyPatch(gradleContent){

    let pCheck = `implementation ?['"]com.facebook.android:facebook-android-sdk`;
    let pAdd = `((dependencies {\\s*)([\\w\\S\\n ]*com.facebook.react:react-native[\\S\\t ]*\\n))`;

    if(!(new RegExp(pCheck)).test(gradleContent)){
        return gradleContent.replace(new RegExp(pAdd), function(match, p1){        
            let patchStr = `${p1}\n    implementation 'com.facebook.android:facebook-android-sdk:[5,6)'\n`;
            return patchStr;
        });
    }
    return gradleContent;
}

module.exports = fbAppGradlePatch;