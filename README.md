# create-react-native-social

Kickstart React Native app with Social Login

[![Build Status](https://travis-ci.com/pankajvaghela/create-react-native-auth.svg?branch=master)](https://travis-ci.com/pankajvaghela/create-react-native-auth) [![Coverage Status](https://coveralls.io/repos/github/pankajvaghela/create-react-native-social/badge.svg?branch=master)](https://coveralls.io/github/pankajvaghela/create-react-native-social?branch=master)

This package lets you create react native app with social login capabilities with minimal efforts from command line.

## Install

Run with npx

```js
npx github:pankajvaghela/create-react-native-social
```

## Usage

### Redux

wrap redux and persistor around your main component

```js

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

//TODO: make sure import path is correct 
import {store, persistor} from '../redux/store/configureStore';

export default function AppContainer(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
```
