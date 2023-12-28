import { Platform, ToastAndroid } from "react-native";
import Orientation from 'react-native-orientation-locker';

export function showToast(message: string, duration: number = 3000) {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }
}

export function useLockOrientationPortrait() {
  Orientation.lockToPortrait();
}
