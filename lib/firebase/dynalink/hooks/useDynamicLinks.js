import { useState, useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default function useDynamicLinks(dynamicLinksHandler) {
  
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink((link) => dynamicLinksHandler(link, false));
    // When the is component unmounted, remove the listener
    return unsubscribe;
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => dynamicLinksHandler(link, true));
  }, []);

}
