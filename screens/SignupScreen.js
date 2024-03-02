import { ActivityIndicator, Keyboard, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import auth from "../util/auth";

function SignupScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userToken, setUserToken] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const safeAreaInsets = useSafeAreaInsets();
    return(
        <ImageBackground
            source={require("../assets/images/background.jpg")}
            style={{ flex: 1, paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }}
        >
            <Pressable style={{ flex: 1, justifyContent: "space-between" }} onPress={() => Keyboard.dismiss() }>
                <View>
                    <Text style={{ textAlign: "center", marginVertical: 32, fontSize: 24, fontWeight: "bold"}}>Sign Up</Text>
                    <View style={{ flexDirection: "row", backgroundColor: "#f1f1f1", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }}>
                        <Icon name={"email"} size={24} color={"black"}/>
                        <TextInput style={{ marginLeft: 8, padding: 0, flex: 1,  }} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={(value) => setEmail(value)} editable={!isAuthenticating} selectTextOnFocus={!isAuthenticating}/>
                    </View>
                    <View style={{ flexDirection: "row", backgroundColor: "#f1f1f1", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 48 }}>
                        <Icon name={"lock"} size={24} color={"black"}/>
                        <TextInput style={{ marginLeft: 8, padding: 0, flex: 1, }} secureTextEntry={true} placeholder="Password" onChangeText={(value) => setPassword(value)} editable={!isAuthenticating} selectTextOnFocus={!isAuthenticating}/>
                    </View>
                    <Pressable style={{ backgroundColor: "#f1f1f1", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }} onPress={() => {
                        setIsAuthenticating(true);
                        auth.createUser(email, password).then((value) => {
                            setUserToken(value.data.idToken);
                            setIsAuthenticating(false);
                        });
                    }}>
                        {
                            isAuthenticating
                            ?
                            <ActivityIndicator />
                            :
                            <Text style={{ textAlign: "center"}}>Sign Up</Text>
                        }
                    </Pressable>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f1f1' }} />
                        <Text style={{ textAlign: 'center', marginHorizontal: 8 }}>or connect with</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f1f1' }} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={{ flex: 1, backgroundColor: "#f1f1f1", marginHorizontal: 12, padding: 8, borderRadius: 24 }}>
                            {/* Icon */}
                            <Text style={{ textAlign: "center" }}>Facebook</Text>
                        </Pressable>
                        <Pressable style={{ flex: 1, backgroundColor: "#f1f1f1", marginHorizontal: 12, padding: 8, borderRadius: 24 }}>
                            {/* Icon */}
                            <Text style={{ textAlign: "center" }}>Google</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 48 }}>
                        <Text>Do you have an account?</Text>
                        <Pressable style={{ marginLeft: 8 }} onPress={() => { navigation.replace("LoginScreen")}}>
                            <Text>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </ImageBackground>
    );
}

export default SignupScreen;