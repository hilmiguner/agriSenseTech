import { View, StyleSheet } from "react-native";
import SimpleButton from "../components/ui/SimpleButton";

function MainScreen({ navigation }) {
    return(
        <View style={styles.rootContainer}>
            <SimpleButton title={"Controller"} onPress={() => navigation.navigate("RobotControlScreen")}/>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
  });