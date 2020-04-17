import React, { Component, useEffect, userInfo } from 'react'
import { Text, StyleSheet, View } from 'react-native';

import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export const ACTION_FB_LOGIN = "login";
export const ACTION_FB_LOGOUT = "logout";

export default function FbLogin(props){

  if(props.showBtn === undefined)
  const [userInfo, setUserInfo] = useState({});

  let login = async () => {

    LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                console.log(
                    "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
            }
        },
        function(error) {
            console.log("Login fail with error: " + error);
        }
    );
    
  };

  let logout = async () => {
    try {
      await LoginManager.logout();
      setUserInfo({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    switch(props.action){
      case ACTION_SIGNIN: login();
      case ACTION_SIGNOUT: logout()
    }

    return () => {}
  }, [props.action]);

  if(props.showBtn || !props.children){
    return(
        <View>
            <LoginButton
                onLoginFinished={
                    (error, result) => {
                    if (error) {
                        console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())
                        }
                        )
                    }
                    }
                }
                onLogoutFinished={() => console.log("logout.")}/>
        </View>
    );
  }else{
    return( <React.Fragment> { props.children } </React.Fragment>)
  }

}

FbLogin.defaultProps = {
    showBtn : true
}

const styles = StyleSheet.create({})
