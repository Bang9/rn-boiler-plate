// @flow

// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';
import Push from './PushService';

export default async (message: RemoteMessage) => {
    // handle your message
    // remote message is contain only data (not notification and notification-data, both will be handling in firebase.notifications() directly)
    Push.showNotification(message);
    return Promise.resolve();
}