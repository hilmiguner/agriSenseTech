import { Pressable, StyleSheet, Text, View } from "react-native";

function StandardButton({ text, color, onPress }) {
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.root, pressed && { opacity : 0.75 }, { backgroundColor: color }]}>
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