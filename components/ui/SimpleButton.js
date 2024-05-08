import { Pressable, StyleSheet, Text } from "react-native";

function SimpleButton({title, onPress}) {
    return (
        <Pressable style={styles.rootContainer} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

export default SimpleButton;

const styles = StyleSheet.create({
    rootContainer: {
        borderRadius: 8,
        backgroundColor: "#4287f5",
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
    },
    title: {
        textAlign: "center",
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
});