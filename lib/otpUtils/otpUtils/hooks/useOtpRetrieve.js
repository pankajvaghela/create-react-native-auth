import { useState, useEffect } from 'react';
import useSMSListener from './useSMSListener';

let regex = /(\d+)[\s]*is|is[\s]*(\d+)\.?/g;

function defaultOtpParser(sms){
  let otpMatch = regex.exec(sms);
  let otp ='';

  if(otpMatch){
    if(otpMatch[1]) otp = otpMatch[1]
    else if(otpMatch[2]) otp = otpMatch[2];
  }

  return otp;
}

//Custom OTP Parser must return an otp;
export default function useOtpRetriever(customOtpParser) {

  const [otp, setOTP] = useState('');
  const [sms, err] = useSMSListener();
  

  useEffect(() => {
    if(customOtpParser){
      setOTP(customOtpParser(sms));
      return;
    }
    if(err) return;

    setOTP(defaultOtpParser(sms));
  },[sms]);

  return otp;
}
