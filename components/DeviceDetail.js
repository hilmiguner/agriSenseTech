import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Context } from "../util/context";
import StandardButton from "./ui/StandardButton";
import theme from "../util/theme";
import { useNavigation } from "@react-navigation/native";

function DeviceDetail() {
    const ctx = useContext(Context);
    const navigation = useNavigation();

    return(
        <View style={styles.rootContainer}>
            <FastImage source={require("../assets/images/robot.png")} style={styles.image}/>
            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>Serial: </Text>
                    <Text style={{ color: "#b9b9b9", fontSize: 20 }}>{ctx.userData.database.device.serial}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>Battery: </Text>
                    <Text style={{ color: "#b9b9b9", fontSize: 20 }}>{ctx.userData.database.device.battery}</Text>
                </View>
                <View>
                    <StandardButton color={theme.secondaryColor} text={"Control Robot"} onPress={() => {
                        navigation.navigate("RobotControlScreen", { serial: ctx.userData.database.device.serial });
                    }}/>
                </View>
            </View>
        </View>
    );
}

export default DeviceDetail;

const styles = StyleSheet.create({
    rootContainer: { 
        margin: 8,
        flexDirection: "row"
    },
    image: { 
        width: 100,
        height: 100
    },
    detailsContainer: {
        justifyContent: "center",
        paddingLeft: 24
    },
});