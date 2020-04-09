import React, { Component, useEffect, userInfo } from 'react'
import { Text, StyleSheet, View } from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

export const ACTION_SIGNIN = "signin";
export const ACTION_SIGNOUT = "signout";

export default function GoogleSignin(props){

  GoogleSignin.configure(props.configure);

  const [userInfo, setUserInfo] = useState({});

  let signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return setUserInfo(userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  let signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    switch(props.action){
      case ACTION_SIGNIN: signIn();
      case ACTION_SIGNOUT: signOut()
    }

    return () => {}
  }, [props.action]);

  if(props.showBtn && !props.children){
    return(
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={this.state.isSigninInProgress} />
    );
  }else{
    return( <React.Fragment> { props.children } </React.Fragment>)
  }

}

const styles = StyleSheet.create({})
