import { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

export default function useFCM() {
  const [remoteMsg, setRemoteMsg] = useState(null);

  useEffect(() => {
    function handleMessageArrived(message) {
      setRemoteMsg(message);
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handleMessageArrived(remoteMessage);
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

  return remoteMsg;
}