import { Pressable, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import theme from "../../util/theme";
import { useNavigation } from "@react-navigation/native";

function WeedItem({ data }) {
    const navigation = useNavigation();

    const imageUri = `data:image/jpeg;base64,${data.image}`;
    return(
        <Pressable style={({pressed}) => [styles.rootContainer, pressed && { opacity : 0.75 }]} onPress={() => navigation.navigate("WeedDetailScreen", {data: data})}> 
            <FastImage source={{ uri: imageUri }} style={styles.image}/>
            <View style={{ flex: 1, padding: 12 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Percentage of being weed is <Text style={styles.textBold}>{data.percentage}</Text></Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Latitude: <Text style={styles.textBold}>{parseFloat(data.latitude).toFixed(5)}</Text></Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Longitude: <Text style={styles.textBold}>{parseFloat(data.longitude).toFixed(5)}</Text></Text>
                </View>
            </View>
        </Pressable>
    );
}

export default WeedItem;

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: theme.secondaryColor,
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    image: { 
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    textContainer: {
        flexDirection: "row"
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    textBold: { 
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    line: {
        height: 2,
        backgroundColor: theme.primaryColor,
        marginVertical: 8,
    },
});