// React Native Temel Paketler
import { Pressable, StyleSheet } from "react-native";

// Vector Icons Paketleri
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";

function IconButton({ icon, size, color, onPress, iconBundle }) {
    let iconContent;
    switch(iconBundle) {
        case "MaterialIcons":
            iconContent = <Icon name={icon} size={size} color={color}/>
            break;
        case "Ionicons":
            iconContent = <Ionicons name={icon} size={size} color={color}/>
            break;
        default:

    }
    return(
        <Pressable style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]} onPress={onPress}>
            {iconContent}
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 12,
    },
    pressed: {
        opacity: 0.7,
    },
});