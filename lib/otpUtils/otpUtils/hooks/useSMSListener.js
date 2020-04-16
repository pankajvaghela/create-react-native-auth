import { useState, useEffect } from 'react';

import { smsListener } from '../otpHelpers';

export default function useSMSListener(smsHandler) {
  const [sms, setSMS] = useState('');
  const [err, setErr] = useState(null);

  useEffect(()=>{
      return smsListener((event)=>{
        setErr(event.timeout ? event : null );
        if(smsHandler) smsHandler(event.message);
        setSMS(event.message);
      });
  })

  return [sms,err];
}
