import SmsRetriever from 'react-native-sms-retriever';

export const getPhoneNumber = async () => {
    return await SmsRetriever.requestPhoneNumber();
};

export function smsListener(cb){

    try {
        SmsRetriever.startSmsRetriever().then(registered => {
            if (registered) {    
                SmsRetriever.addSmsListener(event => {
                    cb(event);
                });
            }
        });
    } catch (error) {
        throw error;
    }

    return SmsRetriever.removeSmsListener;
}
