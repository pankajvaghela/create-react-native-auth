import { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

// by default sets to state first, then calls handler;
export default function useFCMSaveToken(tokenHandler, handler = false) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    function handleTokenRefresh(token) {
      if(handler){
        setToken(token);
        tokenHandler(token);
      }else{
        tokenHandler(token);
        setToken(token);
      }
    }

    // Get the device token
    messaging().getToken().then(token => {
      return handleTokenRefresh(token);
    });
    
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      handleTokenRefresh(token);
    });
  });

  return token;
}