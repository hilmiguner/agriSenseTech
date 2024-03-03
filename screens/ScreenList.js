import { View, StyleSheet } from "react-native";
import SimpleButton from "../components/ui/SimpleButton";

function ScreenList({ navigation }) {
    const user = "none";
    return(
        <View style={styles.rootContainer}>
            <SimpleButton title={`Login Screen (${user})`} onPress={() => navigation.navigate("LoginScreen")}/>
            <SimpleButton title={`Sign Up Screen (${user})`} onPress={() => navigation.navigate("SignupScreen")}/>
            <SimpleButton title={"Controller"} onPress={() => navigation.navigate("RobotControlScreen")}/>
        </View>
    );
}

export default ScreenList;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
  });