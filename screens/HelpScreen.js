import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../util/theme";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import StandardButton from "../components/ui/StandardButton";

function HelpScreen({ navigation }) {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();

    const safeAreaInsets = useSafeAreaInsets();

    return(
        <Pressable style={[styles.root, { paddingTop: safeAreaInsets.top }]} onPress={Keyboard.dismiss}>
            <IconButton color={"white"} icon={"chevron-back"} iconBundle={"Ionicons"} size={24} onPress={navigation.goBack}/>
            <Text style={{ textAlign: "center", fontSize: 20, color: theme.secondaryColor, marginVertical: 12 }}>Send us a message</Text>
            <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontSize: 20, marginBottom: 8 }}>Title</Text>
                <TextInput 
                    style={{ borderWidth: 1.5, borderColor: theme.secondaryColor, borderRadius: 12, padding: 12, color: "white", fontSize: 18 }} 
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontSize: 20, marginBottom: 8 }}>Message</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    style={{ borderWidth: 1.5, borderColor: theme.secondaryColor, borderRadius: 12, padding: 12, paddingTop: 13, color: "white", fontSize: 18 }} 
                    onChangeText={(text) => setMessage(text)}
                />
            </View>
            <View style={{ }}>
                <StandardButton text={"Send"} color={theme.secondaryColor} rootStyle={{ alignSelf: "stretch", marginHorizontal: 12, marginTop: 24 }} onPress={null}/>
            </View>
        </Pressable>
    );
}

export default HelpScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor
    },
});