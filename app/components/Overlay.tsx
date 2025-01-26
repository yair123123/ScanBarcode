import { useEffect } from "react";
import { Animated,  StyleSheet, View } from "react-native"
const SQUARE_SIZE = 250;

type prop = {
    lineAnimation: any
    height: number
    width : number  
}

export default function Overlay({ lineAnimation,height,width }: prop) {
    useEffect(() => {

        Animated.loop(
          Animated.sequence([
            Animated.timing(lineAnimation, {
              toValue: SQUARE_SIZE - 5, 
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(lineAnimation, {
              toValue: 0, 
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, []);
    
    
    const topOffset = (height - SQUARE_SIZE) / 2;
    const leftOffset = (width - SQUARE_SIZE) / 2;
    return (
        <View style={styles.container}>
            <View style={[styles.overlay, { top: 0, height: topOffset }]} />
            <View style={[styles.overlay, { top: topOffset + SQUARE_SIZE, bottom: 0 }]} />
            <View style={[styles.overlay, { top: topOffset, height: SQUARE_SIZE, left: 0, right: width - leftOffset }]} />
            <View style={[styles.overlay, { top: topOffset, height: SQUARE_SIZE, left: leftOffset + SQUARE_SIZE, right: 0 }]} />
            <View style={[styles.square, { left: leftOffset, top: topOffset, height: SQUARE_SIZE, width: SQUARE_SIZE }]}>
                <Animated.View style={[styles.line, { transform: [{ translateY: lineAnimation }] }]} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10, 
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    square: {
        position: "absolute",
        backgroundColor: "transparent", 
        borderWidth: 2,
        borderColor: "white",
    },
    line: {
        position: "absolute",
        backgroundColor: "red",
        height: 2,
        width: "100%",
    },
});
