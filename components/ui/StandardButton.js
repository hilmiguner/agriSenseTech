import { Pressable, StyleSheet, Text } from "react-native";

function StandardButton({ text, color, onPress, rootStyle }) {
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.root, pressed && { opacity : 0.75 }, { backgroundColor: color }, rootStyle]}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

export default StandardButton;

const styles = StyleSheet.create({
    root: {
        padding: 12,
        borderRadius: 18,
        alignItems: "center",
        alignSelf: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});