"use strict";

var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');
// const semver = require('semver');
const semverLte = require('semver/functions/lte');
const semverCoerce = require('semver/functions/coerce');
const utils = require('./util');


function makeDependencyPatch(buildGradlePath) {

  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

  // buildGradle = dependencyPatch(buildGradle);

  buildGradle = patchAppCompat(buildGradle);

  fs.writeFileSync( buildGradlePath, buildGradle, 'utf8' );

  console.log(chalk.green(`${buildGradlePath} patched.`));  
}


// implementation fileTree(dir: "libs", include: ["*.jar"])
// implementation "com.facebook.react:react-native:+"
// implementation "com.android.support:appcompat-v7:23.0.1"
// implementation(project(":react-native-google-signin"))

// apply plugin: 'com.google.gms.google-services' // <--- this should be the last line
const depConfigs = ['compile', 'api', 'implementation'];
const depOrConfigs = depConfigs.join('|');


let dep = {
  appcompat : {
    name :  `com.android.support:appcompat-v7`,
    ver :  `23.0.1`,
    val :  `com.android.support:appcompat-v7:23.0.1`
  }
}

function patchAppCompat(gradleContent){

  let patternMatch = `((${depOrConfigs}) ?['"](com.android.support:appcompat-v7:(${utils.dependencyVerPattern}))['"])`;

  // let patternSingle = utils.getDependencyPattern(patches.dependencies.gservices.name);
  let patternWhole = "((dependencies {\\s*)([\\w\\S\\n ]*com.facebook.react:react-native[\\S\\t ]*\\n))";

  let patternGoogleSign = `(implementation\\(project\\(":react-native-google-signin"\\)\\))`;


  if ((new RegExp(patternMatch)).test(gradleContent)) {
    // return patchReplaceVer(gradleContent, patches.dependencies.gservices);
    return gradleContent.replace(new RegExp(patternMatch, "g"), function(match, p1, p2, p3, p4, offset, input, groups){
      let ver = p3;
      if(semverLte(semverCoerce(ver), dependency.ver)){
        ver = dependency.ver;
      }
      return `${p2}:${ver}`;
    });
  
  }else{
    return gradleContent.replace(new RegExp(patternWhole, "g"), function(match, p1, p2, p3, p4, offset, input, groups){        

      let patchStr = `${p1}\n    implementation "${dep.appcompat.val}"\n`;

      if(!(new RegExp(patternGoogleSign, "g")).test(gradleContent)){
        patchStr += `    implementation(project(":react-native-google-signin"))\n`;
      }

      return patchStr;
    });
  }
}

function patchImpProject(){


}

function patchReplaceVer(str, dependency){
  let pattern = utils.getDependencyPattern(dependency.name);
  return str.replace(new RegExp(pattern), function(match, p1, p2, p3, offset, input, groups){
    let ver = p3;
    if(semverLte(semverCoerce(ver), dependency.ver)){
      ver = dependency.ver;
    }
    return `${p2}:${ver}`;
  });
}


exports.default = makeDependencyPatch;
