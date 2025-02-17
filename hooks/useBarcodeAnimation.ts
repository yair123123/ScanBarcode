import { Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import { useCallback } from "react";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

export default function useBarcodeAnimation(
  correctBarcodeIndex: number,
  setCorrectBarcodeIndex: (index: number) => void,
  barcodesLength: number
) {
    console.log("now"+correctBarcodeIndex);
    
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(0);

  // אנימציה לברקוד הנוכחי – מתעדכנת לפי תרגום הגלילה
  const currentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // אנימציה לברקוד הקודם – יש לו מיקום התחלתי של -SCREEN_WIDTH
  // כך שכשמשתמש מזיז ימינה (תרגום חיובי) הוא ינוע מ־-SCREEN_WIDTH למרכז
  const previousAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value - SCREEN_WIDTH }],
  }));

  // אנימציה לברקוד הבא – יש לו מיקום התחלתי של +SCREEN_WIDTH
  // כך שכשמשתמש מזיז שמאלה (תרגום שלילי) הוא ינוע מ־SCREEN_WIDTH למרכז
  const nextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + SCREEN_WIDTH }],
  }));

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onEndGesture = useCallback(
    ({ nativeEvent }: { nativeEvent: any }) => {
      // אם המשתמש סוויפ ימינה (תרגום חיובי) ויש ברקוד קודם (current > 0)
      if (nativeEvent.translationX > 100 && correctBarcodeIndex > 0) {
        // מניעים את הברקוד הנוכחי עד קצה המסך
        translateX.value = withSpring(SCREEN_WIDTH, {},  () => {
          runOnJS(setCorrectBarcodeIndex)(correctBarcodeIndex - 1);
          translateX.value = 0;
        });
      }
      // אם המשתמש סוויפ שמאלה (תרגום שלילי) ויש ברקוד הבא (current < barcodesLength - 1)
      else if (nativeEvent.translationX < -100 && correctBarcodeIndex < barcodesLength - 1) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          translateX.value = 0;
          runOnJS(setCorrectBarcodeIndex)(correctBarcodeIndex + 1);
        });
      } else {
        // אם לא עובר את הסף – מחזירים את הברקוד למקומו ההתחלתי
        translateX.value = withSpring(0);
      }
    },
    [correctBarcodeIndex, setCorrectBarcodeIndex, barcodesLength]
  );

  return { currentAnimatedStyle, previousAnimatedStyle, nextAnimatedStyle, onGestureEvent, onEndGesture };
}
