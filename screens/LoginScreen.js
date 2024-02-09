import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function LoginScreen() {
    const safeAreaInsets = useSafeAreaInsets();

    return(
        <View style={{ flex: 1, justifyContent: "space-between", paddingTop: safeAreaInsets.top }}>
            <View>
                <Text style={{ textAlign: "center", marginVertical: 32, fontSize: 24, fontWeight: "bold"}}>Login</Text>
                <View style={{ backgroundColor: "red", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }}>
                    {/* Icon */}
                    <TextInput style={{ padding: 0 }} placeholder="Username"/>
                </View>
                <View style={{ backgroundColor: "red", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 48 }}>
                    {/* Icon */}
                    <TextInput style={{ padding: 0 }} secureTextEntry={true} placeholder="Password"/>
                </View>
                <Pressable style={{ backgroundColor: "red", marginHorizontal: 32, borderRadius: 24, padding: 12, marginBottom: 12 }}>
                    <Text style={{ textAlign: "center"}}>Login</Text>
                </Pressable>
                <Pressable>
                    <Text style={{ textAlign: "center"}}>Forgot your password?</Text>
                </Pressable>
            </View>
            <View style={{ marginBottom: 48 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'red' }} />
                    <Text style={{ textAlign: 'center', marginHorizontal: 8 }}>or connect with</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'red' }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={{ flex: 1, backgroundColor: "red", marginHorizontal: 12, padding: 8, borderRadius: 24 }}>
                        {/* Icon */}
                        <Text style={{ textAlign: "center" }}>Facebook</Text>
                    </Pressable>
                    <Pressable style={{ flex: 1, backgroundColor: "red", marginHorizontal: 12, padding: 8, borderRadius: 24 }}>
                        {/* Icon */}
                        <Text style={{ textAlign: "center" }}>Google</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 48 }}>
                    <Text>Don't have account?</Text>
                    <Pressable style={{ marginLeft: 8 }}>
                        <Text>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;