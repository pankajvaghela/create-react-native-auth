import dynamicLinks from '@react-native-firebase/dynamic-links';


export async function buildLink(linkUrl, analytics = null, domainUriPrefix = null ) {
  const link = await dynamicLinks().buildLink({
    link: linkUrl,
    // domainUriPrefix is created in your firebase console
    domainUriPrefix: domainUriPrefix ,
    // optional set up which updates firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: analytics || {
      campaign: 'banner',
    },
  });

  return link;
}