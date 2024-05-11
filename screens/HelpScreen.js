import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../util/theme";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import StandardButton from "../components/ui/StandardButton";
import { Context } from "../util/context";
import auth from "../util/auth";
import moment from "moment";
import database from "../util/database";

function HelpScreen({ navigation }) {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [isSending, setIsSending] = useState(false);

    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();

    const messageData = {
        title: title,
        message: message,
        name: ctx.userData.name,
        email: "",
        datetime: "",
        fb_local_id: ""
    };

    return(
        <Pressable style={[styles.root, { paddingTop: safeAreaInsets.top }]} onPress={Keyboard.dismiss}>
            <View style={{ margin: 12 }}>
                <IconButton color={"white"} icon={"chevron-back"} iconBundle={"Ionicons"} size={24} onPress={navigation.goBack}/>
            </View>
            <ScrollView>
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
                        maxLength={500}
                        style={{ borderWidth: 1.5, borderColor: theme.secondaryColor, borderRadius: 12, padding: 12, paddingTop: 13, color: "white", fontSize: 18 }} 
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>
                <StandardButton text={"Send"} color={theme.secondaryColor} rootStyle={{ alignSelf: "stretch", marginHorizontal: 12, marginTop: 24 }} disabled={isSending} onPress={() => {
                    setIsSending(true);
                    auth.getUserData(ctx.token).then((value => {
                        messageData.fb_local_id = value.data.users[0].localId;
                        messageData.datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                        messageData.email = value.data.users[0].email;
                        database.insertUserMessage(messageData).then(respond => {
                            if(respond.data.status == 200) {
                                Alert.alert(
                                    "Info", 
                                    "You message has been successfully sent.", 
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => navigation.replace("SettingsScreen")
                                        }
                                    ]
                                );
                            }
                            else {
                                Alert.alert(
                                    "Error", 
                                    "Somethins is wrong. Try again later.", 
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => navigation.replace("SettingsScreen")
                                        }
                                    ]
                                );
                            }
                        });
                    }));
                }}/>
            </ScrollView>
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