import { Dimensions, StyleSheet, Text, View } from "react-native";
import VirtualJoystick from "../components/VirtualJoystick";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../util/theme";

const screenWidth = Dimensions.get("screen").width;

function RobotControlScreen({ navigation, route }) {
    const safeAreaInsets = useSafeAreaInsets();

    const robotSerial = route.params.serial;
    return(
        <View style={styles.rootContainer}>
            <View style={[ styles.headerBar, { 
                paddingTop: safeAreaInsets.top, 
                paddingRight: safeAreaInsets.right,
                paddingBottom: safeAreaInsets.bottom,
                paddingLeft: safeAreaInsets.left,
            }]}>
                <View style={{ flexDirection: "row", paddingTop: 20, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <IconButton color={theme.secondaryColor} icon={"chevron-back"} iconBundle={"Ionicons"} size={32} onPress={navigation.goBack}/>
                    </View>
                    <Text style={{ flex: 1, textAlign: "center", color: "white" }}>Serial: {robotSerial}</Text>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={[ styles.joystickContainer, { paddingBottom: safeAreaInsets.bottom, paddingLeft: safeAreaInsets.left, paddingRight: safeAreaInsets.right }]}>
                <VirtualJoystick 
                    padBackgroundColor={"#f50713"} 
                    padBackgroundOpacity={0.6} 
                    padPointColor={"blue"}
                    padOuterCircleSize={100}
                    padInnerCircleSize={35}
                />
                <VirtualJoystick 
                    padBackgroundColor={"#f50713"} 
                    padBackgroundOpacity={0.6} 
                    padPointColor={"blue"}
                    padOuterCircleSize={100}
                    padInnerCircleSize={35}
                />
            </View>
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
        width: screenWidth,
        margin: 12,
    },
});