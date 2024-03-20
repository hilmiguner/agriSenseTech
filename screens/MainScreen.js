import { useContext, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native"
import { Context } from "../util/context";
import auth from "../util/auth";
import database from "../util/database";

function MainScreen() {
    const ctx = useContext(Context);
    
    useEffect(() => {
        auth.getUserData(ctx.token).then((value) => {
            let tempData = value.data.users[0];
            database.getData(`https://agrisensetech-a9d50-default-rtdb.europe-west1.firebasedatabase.app/${tempData.localId}.json`).then((value) => {
                tempData["name"] = value.data.name;
                ctx.setUserCrediantials(tempData);
            });
        });
    }, []);

    let content = <ActivityIndicator />;
    if(ctx.userData) {
        content = (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 24, color: "black" }}>Hello {ctx.userData.name}</Text>
            </View>
        );
    }
    return content;
}

export default MainScreen;