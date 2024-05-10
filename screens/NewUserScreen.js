import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import database from "../util/database";
import FastImage from "react-native-fast-image";
import { Context } from "../util/context";
import theme from "../util/theme";

function NewUserScreen({ navigation, route }) {
    const [name, setName] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();

    const userID = route.params.userID;
    const idToken = route.params.idToken;
    
    return(
        <View style={{ flex: 1, paddingTop: safeAreaInsets.top, justifyContent: "center", backgroundColor: theme.primaryColor }}>
            <FastImage source={require("../assets/images/miniLogo.png")} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }}/>
            <View style={{ marginVertical: 32 }}>
                <Text style={{ fontSize: 32, color: theme.secondaryColor, fontWeight: "bold", textAlign: "center" }}>Hello!</Text>
                <Text style={{ fontSize: 32, color: theme.secondaryColor, fontWeight: "bold", textAlign: "center" }}>What's your name?</Text>
            </View>
            <View>
                <View style={{ flexDirection: "row", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12, borderWidth: 1.5, borderColor: theme.secondaryColor }}>
                    <TextInput style={{ marginLeft: 8, padding: 0, flex: 1, color: theme.secondaryColor }} placeholderTextColor={theme.secondaryDarkColor} placeholder="Your name" onChangeText={(value) => setName(value)}/>
                </View>
                <Pressable style={{ backgroundColor: theme.secondaryColor, marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }} disabled={isLoading} onPress={() => {
                    setIsLoading(true);
                    database.updateData(`${userID}.json`, {name: name}).then((value) => {
                        setIsLoading(false);
                        // navigation.replace("BottomTabs");
                        ctx.authenticate(idToken);
                    })
                    .catch((error) => {
                        Alert.alert(error.name, error.message);
                        setIsLoading(false);
                    });
                }}>
                    {
                        isLoading
                        ?
                        <ActivityIndicator />
                        :
                        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>Continue</Text>
                    }
                </Pressable>
            </View>
        </View>
    );
}

export default NewUserScreen;