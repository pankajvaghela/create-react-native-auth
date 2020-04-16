import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input'
import useOtpRetriever from '../hooks/useOtpRetrieve';


export default function OtpInputComponent(props){

  const {iniOtpVal, pinCount, onOtpValChange, onCodeFilled,  wrapperStyle, style, ...propsExt} = props;
  const [OtpIn, setOtpIn] = useState(iniOtpVal || '');

  const otp = useOtpRetriever();
    
  useEffect(function(){
      setOtpIn(otp);
  },[otp])

  useEffect(function(){
    onOtpValChange(OtpIn);
  },[OtpIn]);

  return(
    <View style={[styles.container, wrapperStyle]}>
      <OTPInputView
          style={[{flexGrow:1, height: 50}, style]}
          pinCount={pinCount || 4}
          code={OtpIn}
          onCodeChanged = {code => setOtpIn(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {onCodeFilled || (code => {
              console.log(`Otp is ${code}, you are good to go!`)
          })}
          {...propsExt}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      display:"flex",
      alignContent:"center",
      justifyContent:"center",

  },
  borderStyleBase: {
      width: 30,
      height: 45
  },

  borderStyleHighLighted: {
      borderColor: "#032A86",
  },

  underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor:"#333",
      color:'#444'
  },

  underlineStyleHighLighted: {
      borderColor: "#032A86",
  },
});
