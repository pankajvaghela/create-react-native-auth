"use strict";

var fs = require('fs-extra');
var chalk = require('chalk');
// const utils = require('./util');


function fbManifestPatch(filePath, relPath, options) {

  let fileContent = fs.readFileSync(filePath, 'utf8');

  fileContent = permissionPatch(fileContent);
  fileContent = metaPatch(fileContent);

  if(options.fb_app_share_media){
    fileContent = providerPatch(fileContent, options);
  }

  fs.writeFileSync( filePath, fileContent, 'utf8' );

  console.log(chalk.green(`Fb: ${relPath || filePath} patched.`));  
}

// <uses-permission android:name="android.permission.INTERNET"/>
function permissionPatch(content){

    let pForCheck = `(<uses-permission android:name=["']android\\.permission\\.INTERNET["'] ?\\/>)`;
    let pForAdd =`(<application)`;

  if(!(new RegExp(pForCheck)).test(content)){
    return content.replace(new RegExp(pForAdd), function(match, p1, ){
        return `<uses-permission android:name="android.permission.INTERNET"/>\n    ${p1}`;
    });
  }

  return content;
}

//<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
function metaPatch(content){

    let pForCheck = `(android:name="com.facebook.sdk.ApplicationId")`;
    let pForAdd =`(<\\/application>)`;

  if(!(new RegExp(pForCheck)).test(content)){
    return content.replace(new RegExp(pForAdd), function(match, p1, ){
        return `\n      <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>\n    ${p1}`;
    });
  }

  return content;
}

/*
<provider android:authorities="com.facebook.app.FacebookContentProvider1234"
          android:name="com.facebook.FacebookContentProvider"
          android:exported="true" />
*/
function providerPatch(content, options){

    let pForCheck = `(android:name="com.facebook.FacebookContentProvider")`;
    let pForAdd =`(<\\/manifest>)`;

  if(!(new RegExp(pForCheck)).test(content)){
    return content.replace(new RegExp(pForAdd), function(match, p1){
        return `\n    <provider android:authorities="com.facebook.app.FacebookContentProvider${options.fb_app_id}"
          android:name="com.facebook.FacebookContentProvider"
          android:exported="true" />
          \n${p1}`;
    });
  }

  return content;
}


module.exports = fbManifestPatch;