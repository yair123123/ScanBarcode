import { Vibration } from "react-native";

export const errorVibration = () => {
  const pattern = [0, 100, 50, 100];
  Vibration.vibrate(pattern, false);
};

export const successVibration = () => {
  Vibration.vibrate(100);
};
