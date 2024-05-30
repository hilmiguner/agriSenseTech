import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import auth from "../util/auth";
import { Context } from "../util/context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../util/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsListItem from "../components/ui/SettingsListItem";
import async_storage from "../util/async_storage";

function SettingsScreen({ navigation }) {
    const [email, setEmail] = useState();
    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();

    useEffect(() => {
        auth.getUserData(ctx.token).then((value) => {
            setEmail(value.data.users[0].email);
        })
    }, []);
    let content = <ActivityIndicator />;

    if(email) {
        content=(
            <>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
                    <Ionicons name="person-circle" size={72} color={theme.secondaryColor}/>
                    <View style={{ marginLeft: 24}}>
                        <Text style={{ fontSize: 20, color: "white" }}>{ctx.userData.database?.name ? ctx.userData.database.name : "Unknown"}</Text>
                        <Text style={{ fontSize: 18, color: "#b9b9b9", fontStyle: "italic" }}>{email}</Text>
                    </View>
                </View>
                <View>
                    <SettingsListItem iconName={"information-circle"} title={"Help"} color={"white"} backgroundColor={theme.primaryLightColor} onPress={() => {
                        navigation.navigate("HelpScreen");
                    }} />
                    <View style={{ borderTopWidth: 1.5, borderColor:theme.primaryLightColor, margin: 8 }}></View>
                    <SettingsListItem iconName={"trash"} title={"Wipe cache"} color={"white"} backgroundColor={theme.primaryLightColor} onPress={() => {
                        async_storage.wipeData();
                        ctx.logout(); 
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "LoginScreen" }]
                        });
                    }} />
                    <SettingsListItem iconName={"log-out"} title={"Log out"} color={theme.errorRedColor} backgroundColor={theme.primaryLightColor} onPress={() => {
                        async_storage.removeItem("authInfo");
                        ctx.logout(); 
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "LoginScreen" }]
                        });
                    }} />
                </View>
            </>
        );
    }

    return(
        <ScrollView style={[styles.root, { paddingTop: safeAreaInsets.top }]}>
            {content}
        </ScrollView>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor,
    },
});