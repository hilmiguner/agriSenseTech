import { StyleSheet, View } from "react-native";
import theme from "../util/theme";
import MapView, { Marker } from 'react-native-maps';
import IconButton from "../components/ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import StandardButton from "../components/ui/StandardButton";

function WeedMap({ navigation, route }) {
    const safeAreaInsets = useSafeAreaInsets();

    // Keys for data => ["id", "fb_local_id", "image", "image_path", "latitude", "longitude", "percentage"]
    const data = route.params.data;

    const mapRef = useRef(null);

    return(
        <View style={[styles.root, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
            <View style={{ margin: 12 }}>
                <IconButton color={"white"} icon={"chevron-back"} iconBundle={"Ionicons"} size={24} onPress={navigation.goBack}/>
            </View>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider="google"
                mapType="satellite"
                initialRegion={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker
                    coordinate={{ latitude: data.latitude, longitude: data.longitude, }}
                    title={"Weed"}
                    description={"Weed Location"}
                />
            </MapView>
            <View style={styles.toolContainer}>
                <StandardButton color={theme.secondaryColor} text={"Go to Weed"} onPress={() => {
                    mapRef.current.animateToRegion({
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    });
                }}/>
            </View>
        </View>
    );
}

export default WeedMap;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.primaryColor
    },
    map: {
        flex: 1,
    },
    toolContainer: {
        margin: 12,
        alignItems: "center"
    },
});