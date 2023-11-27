import { View, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SimpleButton from "../components/ui/SimpleButton";

function MainScreen() {
    const insets = useSafeAreaInsets();
    return(
        <View style={[styles.rootContainer, {marginTop: insets.top}]}>
            <SimpleButton title={"Controller"}/>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
  });