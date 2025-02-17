import { Linking } from "react-native";

    const openEmailApp = (email:string) => {
        const mailto = `mailto:${email}`
        Linking.openURL(mailto).catch(err => console.error("Failed to open email app", err))
    }
    const openWhatsApp = (phone:string) => {
        const whatsappUrl = `https://wa.me/${phone}`;

        Linking.openURL(whatsappUrl).catch(err => console.error("Failed to open WhatsApp", err));
    };
    const openLinkedIn = (linkedinId:string) => {
        const linkedInProfile = linkedinId;
        const linkedInUrl = `https://www.linkedin.com/in/${linkedInProfile}`;
        
        Linking.openURL(linkedInUrl).catch(err => console.error("Failed to open LinkedIn", err));
    };
    export {openEmailApp,openLinkedIn,openWhatsApp}
    