import { View, StyleSheet } from "react-native";
import SimpleButton from "../components/ui/SimpleButton";

function MainScreen() {
    return(
        <View style={styles.rootContainer}>
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