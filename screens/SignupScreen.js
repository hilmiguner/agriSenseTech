import { ActivityIndicator, Alert, Keyboard, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useContext, useState } from "react";
import auth from "../util/auth";
import { Context } from "../util/context";
import database from "../util/database";
import async_storage from "../util/async_storage";
import theme from "../util/theme";
import FastImage from "react-native-fast-image";

function SignupScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const ctx = useContext(Context);

    const safeAreaInsets = useSafeAreaInsets();
    return(
        <Pressable style={{ flex: 1, paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, justifyContent: "space-between", backgroundColor: theme.primaryColor }} onPress={() => Keyboard.dismiss()}>
            <View>
                <FastImage source={require("../assets/images/miniLogo.png")} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginVertical: 32 }}/>
                <Text style={{ textAlign: "center", marginVertical: 32, fontSize: 24, fontWeight: "bold", color: theme.secondaryColor }}>Sign Up</Text>
                <View style={{ borderWidth: 1.5, borderColor: theme.secondaryColor, flexDirection: "row", alignItems: "center", marginHorizontal: 32, borderRadius: 24, paddingHorizontal: 12, paddingVertical: 2, marginBottom: 12 }}>
                    <Icon name={"email"} size={24} color={theme.secondaryColor}/>
                    <TextInput
                        style={{ flex: 1,  borderRadius: 12, padding: 12, color: "white", fontSize: 18 }} 
                        onChangeText={(text) => setEmail(text)} 
                        placeholderTextColor={theme.secondaryDarkColor} 
                        placeholder="E-mail" 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        editable={!isAuthenticating} 
                        selectTextOnFocus={!isAuthenticating}
                    />
                </View>
                <View style={{ borderWidth: 1.5, borderColor: theme.secondaryColor, flexDirection: "row", alignItems: "center", marginHorizontal: 32, borderRadius: 24, paddingHorizontal: 12, paddingVertical: 2, marginBottom: 12 }}>
                    <Icon name={"lock"} size={24} color={theme.secondaryColor}/>
                    <TextInput 
                        style={{ flex: 1,  borderRadius: 12, padding: 12, color: "white", fontSize: 18 }}
                        secureTextEntry={true} 
                        placeholderTextColor={theme.secondaryDarkColor} 
                        placeholder="Password" 
                        onChangeText={(value) => setPassword(value)} 
                        editable={!isAuthenticating} 
                        selectTextOnFocus={!isAuthenticating}
                    />
                </View>
                <Pressable style={{ backgroundColor: theme.secondaryColor, marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }} disabled={isAuthenticating} onPress={() => {
                    setIsAuthenticating(true);
                    auth.createUser(email, password).then((value) => {
                        async_storage.storeObjectData("authInfo", {email: email, password: password});
                        database.writeData(`${value.data.localId}.json`, {name: ""}).then(() => {
                            setIsAuthenticating(false);
                            navigation.replace("NewUserScreen", { userID: value.data.localId, idToken: value.data.idToken });
                        });
                        
                    })
                    .catch((error) => {
                        Alert.alert(error.name, error.message);
                        setIsAuthenticating(false);
                    });
                }}>
                    {
                        isAuthenticating
                        ?
                        <ActivityIndicator />
                        :
                        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>Sign Up</Text>
                    }
                </Pressable>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 24 }}>
                <Text style={{ color: "white" }}>Do you already have an account?</Text>
                <Pressable style={{ marginLeft: 8 }} onPress={() => { navigation.replace("LoginScreen") }}>
                    <Text style={{ textDecorationLine: "underline", color: theme.secondaryColor }}>Login</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

export default SignupScreen;