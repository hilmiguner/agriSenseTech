import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions} from "react-native"
import { Context } from "../util/context";
import auth from "../util/auth";
import database from "../util/database";
import FastImage from "react-native-fast-image";
import StandardButton from "../components/ui/StandardButton";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../util/theme";
import DeviceDetail from "../components/DeviceDetail";

let screenWidth = Dimensions.get("screen").width;

function MainScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();
    
    useEffect(() => {
        auth.getUserData(ctx.token).then((value) => {
            let tempData = value.data.users[0];
            database.getData(`${tempData.localId}.json`).then((value) => {
                tempData["database"] = value.data;
                ctx.setUserCrediantials(tempData);
                setIsLoading(false);
            });
        });
    }, []);


    let content = (
        <View style={{ flex: 1, justifyContent: "center", paddingTop: safeAreaInsets.top, backgroundColor: theme.primaryColor }}>
            <ActivityIndicator />
        </View>
    );
    if(ctx.userData && !isLoading) {
        let deviceContent = <ActivityIndicator color={theme.secondaryColor}/>;
        if(!ctx.userData.database.device) {
            deviceContent = (
                <View style={{ margin: 8 }}>
                    <Text style={{color: "white", fontSize: 20, textAlign: "center", marginBottom: 12 }}>There is no connected device.</Text>
                    <StandardButton text={"Connect Device"} color={theme.secondaryColor} onPress={null}/>
                </View>
            );
        }
        else {
            deviceContent = <DeviceDetail />;
        }
        content = (
            <ScrollView 
                style={[
                    styles.root,
                    { 
                        paddingLeft: safeAreaInsets.left,
                        paddingTop: safeAreaInsets.top,
                        paddingRight: safeAreaInsets.right,
                        paddingBottom: safeAreaInsets.bottom
                    }
                ]} 
                contentContainerStyle={{ alignItems: "center"}}
            >
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <FastImage source={require("../assets/images/miniLogo.png")} style={{  width: 25, height: 25, borderRadius: 12.5, marginRight: 12 }}/>
                        <Text style={{ color: "white", fontSize: 20 }}>Hi {ctx.userData.database.name + (ctx.userData.name ? "!" : "")}</Text>
                    </View>
                    <View>
                        <IconButton color={theme.secondaryColor} icon={"log-out"} iconBundle={"Ionicons"} onPress={() => {
                            ctx.logout(); 
                            navigation.reset({
                              index: 0,
                              routes: [{ name: "LoginScreen" }]
                            });
                        }} size={24}/>
                    </View>
                </View>
                <View style={styles.devicesContainer}>
                    <Text style={styles.textBold}>Your device</Text>
                    <View style={{ borderTopWidth: 1.5, borderColor: theme.secondaryColor, marginVertical: 8 }}></View>
                    { deviceContent }
                </View>
            </ScrollView>
        );
    }
    return content;
}

export default MainScreen;

const styles = StyleSheet.create({
    text: { 

    },
    textBold: { 
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 12,
    },
    devicesContainer: {
        backgroundColor: theme.primaryLightColor,
        borderRadius: 12,
        width: screenWidth-24,
        padding: 12,
    },
});