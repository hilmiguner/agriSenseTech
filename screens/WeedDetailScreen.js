import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconButton from "../components/ui/IconButton";
import theme from "../util/theme";
import FastImage from "react-native-fast-image";
import StandardButton from "../components/ui/StandardButton";
import ImageView from "react-native-image-viewing";
import { useState } from "react";

const screenSize = Dimensions.get("screen");

function WeedDetailScreen({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const safeAreaInsets = useSafeAreaInsets();
    // Keys for data => ["id", "fb_local_id", "image", "image_path", "latitude", "longitude", "percentage"]
    const data = route.params.data;

    const imageUri = `data:image/jpeg;base64,${data.image}`;
    
    return(
        <View style={[styles.root, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
            <ImageView
                images={[{ uri: imageUri }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
            <View style={{ margin: 12 }}>
                <IconButton color={"white"} icon={"chevron-back"} iconBundle={"Ionicons"} size={24} onPress={navigation.goBack}/>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between"}}>
                <View>
                    <Pressable onPress={() => setVisible(true)}>
                        <FastImage source={{ uri: imageUri }} style={styles.image}/>
                    </Pressable>
                    <View style={{ margin: 12 }}>
                        <Text style={styles.textBold}>Weed</Text>
                        <Text style={styles.text}>Percentage: <Text style={styles.textBold}>{data.percentage}</Text></Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <StandardButton color={theme.secondaryColor} text={"See on map"} rootStyle={{ flex: 1, marginLeft: 12, marginRight: 12 }}/>
                    <StandardButton color={theme.errorRedColor} text={"DELETE"} rootStyle={{ flex: 1, margingLeft: 12, marginRight: 12 }}/>
                </View>
            </View>
        </View>
    );
}

export default WeedDetailScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor,
    },
    image: { 
        width: screenSize.width,
        height: screenSize.height*0.3,
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    }
});