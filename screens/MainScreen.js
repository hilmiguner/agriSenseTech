import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions} from "react-native"
import { Context } from "../util/context";
import auth from "../util/auth";
import database from "../util/database";
import FastImage from "react-native-fast-image";
import StandardButton from "../components/ui/StandardButton";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let screenWidth = Dimensions.get("screen").width;

function MainScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();
    
    useEffect(() => {
        auth.getUserData(ctx.token).then((value) => {
            let tempData = value.data.users[0];
            database.getData(`${tempData.localId}.json`).then((value) => {
                tempData["name"] = value.data.name;
                tempData["device"] = value.data.device;
                ctx.setUserCrediantials(tempData);
                setIsLoading(false);
            });
        });
    }, []);


    let content = <ActivityIndicator />;
    if(ctx.userData && !isLoading) {
        let deviceContent;
        if(!ctx.userData.device) {
            deviceContent = (
                <View style={{ margin: 8 }}>
                    <Text style={[styles.text, { textAlign: "center", marginBottom: 12 }]}>There is no connected device.</Text>
                    <StandardButton text={"Connect Device"} onPress={null}/>
                </View>
            );
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
                        <Text style={styles.text}>Hi {ctx.userData.name + (ctx.userData.name ? "!" : "")}</Text>
                    </View>
                    <View>
                        <IconButton color={"#5664F5"} icon={"log-out"} iconBundle={"Ionicons"} onPress={() => {
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
                    <View style={{ borderTopWidth: 1.5, borderColor: "#5664F5", marginVertical: 8 }}></View>
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
        color: "white",
        fontSize: 20 
    },
    textBold: { 
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    root: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "#141628",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 12,
    },
    devicesContainer: {
        backgroundColor: "#1B2042",
        borderRadius: 12,
        width: screenWidth-24,
        padding: 12,
    },
});