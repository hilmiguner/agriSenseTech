import { StyleSheet, View } from "react-native";
import theme from "../util/theme";
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HelpScreen({ navigation }) {
    const safeAreaInsets = useSafeAreaInsets();

    return(
        <View style={[styles.root, { paddingTop: safeAreaInsets.top }]}>
            <IconButton color={"white"} icon={"chevron-back"} iconBundle={"Ionicons"} size={24} onPress={navigation.goBack}/>
        </View>
    );
}

export default HelpScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor
    },
});