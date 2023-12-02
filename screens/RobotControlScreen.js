import { StyleSheet, View } from "react-native";
import VirtualJoystick from "../components/VirtualJoystick";

function RobotControlScreen() {
    return(
        <View style={styles.rootContainer}>
            <VirtualJoystick 
                padBackgroundColor={"#f50713"} 
                padBackgroundOpacity={0.6} 
                padPointColor={"blue"}
                padOuterCircleSize={100}
                padInnerCircleSize={35}
            />
        </View>
    );
}

export default RobotControlScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});