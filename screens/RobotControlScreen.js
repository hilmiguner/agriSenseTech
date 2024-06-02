import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import VirtualJoystick from "../components/VirtualJoystick";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../util/theme";
import { useEffect, useState } from "react";

const screenSize = Dimensions.get("window");

function RobotControlScreen({ navigation, route }) {
    const [connected, setConnected] = useState(false);
    const [ws, setWs] = useState(null);

    const safeAreaInsets = useSafeAreaInsets();
    const robotSerial = route.params.serial;

    useEffect(() => {
        const websocket = new WebSocket("ws://145.239.134.25:12345");
        websocket.onopen = () => {
            setConnected(true);
        };
        setWs(websocket);

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []);

    function sendJoystickLeft(xValue, yValue) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({"leftJoystick": {"xValue": xValue, "yValue": yValue}}));
        }
    }

    function sendJoystickRight(xValue, yValue) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({"rightJoystick": {"xValue": xValue, "yValue": yValue}}));
        }
    }

    let content = <ActivityIndicator />;

    if (connected) {
        content = (
            <View style={[ styles.joystickContainer, { 
                // paddingTop: safeAreaInsets.top, 
                paddingRight: safeAreaInsets.right,
                paddingBottom: safeAreaInsets.bottom,
                paddingLeft: safeAreaInsets.left,
            }]}>
                <VirtualJoystick 
                    padBackgroundColor={"#f50713"} 
                    padBackgroundOpacity={0.6} 
                    padPointColor={"blue"}
                    padOuterCircleSize={100}
                    padInnerCircleSize={35}
                    onValueChange={sendJoystickLeft}
                />
                <VirtualJoystick 
                    padBackgroundColor={"#f50713"} 
                    padBackgroundOpacity={0.6} 
                    padPointColor={"blue"}
                    padOuterCircleSize={100}
                    padInnerCircleSize={35}
                    onValueChange={sendJoystickRight}
                />
            </View>
        );
    }
    return(
        <View style={styles.rootContainer}>
            <View style={[ styles.headerBar, { 
                paddingTop: safeAreaInsets.top, 
                paddingRight: safeAreaInsets.right,
                // paddingBottom: safeAreaInsets.bottom,
                paddingLeft: safeAreaInsets.left,
            }]}>
                <View style={{ flexDirection: "row", paddingVertical: 20, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <IconButton color={theme.secondaryColor} icon={"chevron-back"} iconBundle={"Ionicons"} size={32} onPress={navigation.goBack}/>
                    </View>
                    <Text style={{ flex: 1, textAlign: "center", color: "white" }}>Serial: {robotSerial}</Text>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            { content }
        </View>
    );
}

export default RobotControlScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
    },
    headerBar: {
        backgroundColor: theme.primaryColor, 
        alignSelf: "stretch",
        alignItems: "center"
    },
    joystickContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: (screenSize.height > screenSize.width ? screenSize.height : screenSize.width) - 48,
        marginBottom: 24,
    },
});
