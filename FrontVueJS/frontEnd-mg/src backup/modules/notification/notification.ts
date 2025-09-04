// src/utils/firebase-messaging.js

import { app } from "@/utils/firebase";
import { ElNotification } from "element-plus";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { DeviceService } from "../device/deviceService";
const messaging = getMessaging(app);

// Hàm để lấy token FCM
const getDeviceService = new DeviceService();
export const requestFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BMjcIZPr_tV2wDEgt4SLt3wvP5fPKaXCC1pEqKuz470PbvxnTirSbntzVc-E0gcfeVrRgx_ThYvQeZPbZJX6CPQ' });
    if (currentToken) {
      await getDeviceService.createDevice(currentToken);
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

// Đăng ký listener để xử lý tin nhắn foreground
export const onMessageListener = () => {
    onMessage(messaging, (payload) => {
        if (payload.notification) {
            ElNotification({
                title: payload.notification.title,
                message: payload.notification.body,
            });
        }
    });
};

export { messaging };
