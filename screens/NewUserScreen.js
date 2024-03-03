import { useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import database from "../util/database";

function NewUserScreen({ route }) {
    const [name, setName] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const safeAreaInsets = useSafeAreaInsets();

    const userID = route.params.userID;
    
    return(
        <ImageBackground
            source={require("../assets/images/background.jpg")}
            style={{ flex: 1, paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, justifyContent: "center" }}
        >
            <View style={{ marginVertical: 32 }}>
                <Text style={{ fontSize: 32, color: "white", fontWeight: "bold", textAlign: "center" }}>Hello!</Text>
                <Text style={{ fontSize: 32, color: "white", fontWeight: "bold", textAlign: "center" }}>What's your name?</Text>
            </View>
            <View>
                <View style={{ flexDirection: "row", backgroundColor: "#f1f1f1", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }}>
                    <TextInput style={{ marginLeft: 8, padding: 0, flex: 1,  }} placeholderTextColor={"#848383"} placeholder="Your name" onChangeText={(value) => setName(value)}/>
                </View>
                <Pressable style={{ backgroundColor: "#f1f1f1", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }} disabled={isLoading} onPress={() => {
                    setIsLoading(true);
                    database.writeData(`https://agrisensetech-a9d50-default-rtdb.europe-west1.firebasedatabase.app/${userID}.json`, {name: name}).then((value) => {
                        setIsLoading(false);
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
                        <Text style={{ textAlign: "center", color: "black", fontWeight: "bold", fontSize: 20 }}>Continue</Text>
                    }
                </Pressable>
            </View>
        </ImageBackground>
    );
}

export default NewUserScreen;