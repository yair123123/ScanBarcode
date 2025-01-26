// return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.cameraContainer}>
//         <CameraView
//           facing="back"
//           onBarcodeScanned={scanned ? undefined : handleBarcode}
//           style={styles.camera}
//         />

//         {/* שכבות ההחשכה */}
//         <View style={[styles.overlay, { top: 0, bottom: height - topOffset - 113 }]} />
//         <View style={[styles.overlay, { top: topOffset + SQUARE_SIZE, bottom: 0 }]} />
//         <View style={[styles.overlay, { top: topOffset, height: SQUARE_SIZE, left: 0, right: width - leftOffset }]} />
//         <View style={[styles.overlay, { top: topOffset, height: SQUARE_SIZE, left: leftOffset + SQUARE_SIZE, right: 0 }]} />
//         <View
//           style={[
//             styles.textOverlay,
//             {
//               top: topOffset - 40, // ממקם את הטקסט מעל הריבוע
//               left: leftOffset,
//               width: SQUARE_SIZE,
//             },
//           ]}
//         >
//           <Text style={styles.text}>אנא סרוק את הברקוד כאן</Text>
//         </View>
//         <View
//           style={[
//             styles.square,
//             {
//               left: leftOffset,
//               top: topOffset,
//               height: SQUARE_SIZE,
//               width: SQUARE_SIZE,
//             },
//           ]}
//         >
//           <Animated.View
//             style={[
//               styles.line,
//               {
//                 transform: [{ translateY: lineAnimation }],
//               },
//             ]}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <TextInput
//             value={barcodeData}
//             onChangeText={setBarcodeData}
//             placeholder="הקלדה ידנית"
//             keyboardType="numeric"
//             style={styles.input}
//           />
//           <CustomButton
//             title="הוסף"
//             onPress={() => {
//               scanned ? undefined : handleBarcode({ type: "code128", data: barcodeData });
//             }}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );

// }

