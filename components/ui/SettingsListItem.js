import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function SettingsListItem({ iconName, title, color, backgroundColor, onPress }) {
    return(
        <Pressable style={({pressed}) => [styles.root, {backgroundColor: backgroundColor}, pressed && { opacity: 0.7 }]} onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center"}}>
                <Ionicons name={iconName} size={24} color={color}/>
                <Text style={{ color: color, fontSize: 20, marginLeft: 8 }}>{title}</Text>
            </View>
            <Ionicons name={"chevron-forward-outline"} size={24} color={color}/>
        </Pressable>
    );
}

export default SettingsListItem;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        padding: 18,
        margin: 8,
        borderRadius: 18,
        justifyContent: "space-between",
        alignItems: "center"
    },
});