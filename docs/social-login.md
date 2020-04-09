# Social Login

## Google Sign In

For RN >= 0.60 We will use version 3 installed from `@react-native-community/google-signin`

[Official Docs](https://github.com/react-native-community/google-signin/blob/master/README.md) for the `google-signin` package

### setup

1. Follow [this](https://github.com/react-native-community/google-signin/blob/master/docs/get-config-file.md) guide to get the configuration file.
2. Place the generated configuration file (google-services.json) ready in current directory or keep the path to file ready.

### Prerequisites

1. Create Firebase Project
2. Add App (Get package name from Android Manifest File in android directory) inside Project settings
3. Enter required information and download the config file.
4. Place the generated configuration file `(google-services.json)` into `<YOUR_PROJECT_ROOT>/android/app`

*Note: For Android, adding the SHA1 hash is an obligation, see below for how to [generate sha1](#generate-sha1)*

If you need more, Follow the instructions to [Configure a Google API Project](https://developers.google.com/identity/sign-in/android/start#configure-a-google-api-project) from the official docs.

#### Generate SHA1

##### Debug mode

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

##### Release mode

```bash
keytool -list -v -keystore {keystore_name} -alias {alias_name}
```

example

```bash
keytool -list -v -keystore C:\Users\MG\Desktop\test.jks -alias test
```

~ Note : windows uses backward slash

### Setup and initialization

`yarn add @react-native-community/google-signin`

Then follow the [Android guide](https://github.com/react-native-community/google-signin/blob/HEAD/docs/android-guide.md) and [iOS guide](https://github.com/react-native-community/google-signin/blob/HEAD/docs/ios-guide.md)

### Configure

```js
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure();
```

We don't need extra configure option for social login as we get name and email by default.

### API used

#### Sign In

Prompts a modal to let the user sign in into your application.

```js
// import statusCodes along with GoogleSignin
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

// Somewhere in your code
signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
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
```

#### isSignedIn()

This method is used to find out whether some user is currently signed in.

```js
isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  this.setState({ isLoginScreenPresented: !isSignedIn });
};
```

#### getCurrentUser()

This method resolves with null or userInfo object. The call never rejects and in the native layer, this is a synchronous call. Note that on Android, accessToken is always null in the response.

```js
getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  this.setState({ currentUser });
};
```

#### signOut()

Removes user session from the device.

```js
signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
```

For more methods look at offcial document.

## Facebook Sign In

### Install

We will use native fbsdk package

`yarn add react-native-fbsdk`

### Prepare

follow  of the [Getting Started Guide](https://developers.facebook.com/docs/facebook-login/android) for Facebook Android SDK to set up a Facebook app.

- Follow steps 1-7
- Skip step about gradle changes (step 3)

### Public API & usage

#### Log In and token

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {
  render() {
    return (
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
  }
};
```

