import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SplashScreen(){
  return(<View><Text>Welcome to SplashScreen</Text></View>)
}

function AppScreen(){
  return(<View><Text>Welcome to AppScreen</Text></View>)
}

const AppStack = createStackNavigator();

// const headerMode = "none"
function AppRouter(props){

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Welcome" headerMode={headerMode} >
        <AppStack.Screen name="Welcome" component={SplashScreen} />
        <AppStack.Screen name="App" component={AppScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})


export default AppRouter;
