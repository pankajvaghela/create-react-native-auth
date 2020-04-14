import messaging from '@react-native-firebase/messaging';

export async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

export async function requestUserPermission() {
  const settings = await messaging().requestPermission();

  if (settings) {
    console.log('Permission settings:', settings);
  }
}

export async function saveFCMTokenToDatabase(token) {
  console.log("saveTokenToDatabase -> token", token)
}

export function setFCMBackgroundMessageHandler(handler){
  // Register background handler
  return messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    handler(remoteMessage);
  });
}
