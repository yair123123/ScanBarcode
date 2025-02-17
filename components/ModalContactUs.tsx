import CustomButton from "@/ui/CustomButton"
import { openEmailApp, openLinkedIn, openWhatsApp } from "@/utils/ContactUs"
import { Modal, View, Text, Button, StyleSheet, Image, Linking, Touchable, TouchableOpacity, TouchableWithoutFeedback } from "react-native"

type props = {
    isVisible: boolean
    setIsVisible: () => void
}

export default function ModalContactUs({ isVisible, setIsVisible }: props) {
    const email = "ytykhn8@gmail.com"
    const phone = "+972508813867"
    const linkedinId = "yair-achrack-07b0462a6"


    return (
        <Modal

            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={setIsVisible}
        >
            <TouchableWithoutFeedback onPress={setIsVisible}>

                <View style={styles.modalOverlay}>
                    <View onStartShouldSetResponder={() => true} style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => { openEmailApp(email) }} style={[styles.modalSection, { backgroundColor: "rgba(238, 124, 124, 0.32)" }]}>
                            <Text style={styles.sectionText}>ytytkhn8@gmail.com</Text>
                            <Image style={styles.image} source={require("@/assets/images/gmail.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openWhatsApp(phone) }} style={[styles.modalSection, { backgroundColor: "rgba(45, 219, 74, 0.31)" }]}>
                            <Text style={styles.sectionText}>{phone}</Text>
                            <Image style={styles.image} source={require("@/assets/images/whatsapp.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openLinkedIn(linkedinId) }} style={[styles.modalSection, { backgroundColor: "rgba(6, 38, 143, 0.29)" }]}>
                            <Text style={styles.sectionText}>{linkedinId}</Text>
                            <Image style={styles.image} source={require("@/assets/images/linkedin.png")} />
                        </TouchableOpacity>
                        <View style={styles.closeButtonContainer}>
                            <Button title="סגור" onPress={setIsVisible} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 320,
        paddingVertical: 20,
        backgroundColor: "white",
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8, 
    },
    modalSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        width: "90%",
        minHeight: 60,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    sectionText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    closeButtonContainer: {
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
});
