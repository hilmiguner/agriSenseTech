import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let screenWidth = Dimensions.get("screen").width;

function CustomTabBar({ state, descriptors, navigation }) {
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={{ 
            flexDirection: 'row',
            backgroundColor: "#1B2042",
            paddingBottom: safeAreaInsets.bottom,
            borderTopWidth: 1.5,
            borderColor: "#5664F5",
            elevation: 5, 
            shadowColor: "#5664F5",
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.5,
            shadowRadius: 5,
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                }
                };

                // const onLongPress = () => {
                //   navigation.emit({
                //     type: 'tabLongPress',
                //     target: route.key,
                //   });
                // };

                const icon =( 
                    label == "MainScreen" ? <Ionicons name="home-outline" size={30} color={isFocused ? "white": "#5664F5"}/> :
                    label == "RobotControlScreen" ? <Ionicons name="game-controller-outline" size={30} color={isFocused ? "white": "#5664F5"}/> : null
                );

                return (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    key={label}
                    onPress={onPress}
                    onLongPress={null}
                    style={styles.tabBarItem}
                >
                    {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                    {label}
                    </Text> */}
                    <View style={[
                        styles.itemInner,
                        isFocused && { 
                            backgroundColor: "#5664F5",
                            elevation: 5, 
                            shadowColor: "#5664F5",
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 0.7,
                            shadowRadius: 10,
                        }
                    ]}>
                        {icon}
                    </View>
                </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default CustomTabBar;

const styles = StyleSheet.create({
    tabBarItem: {
        flex: 1,
        padding: 12,
    },
    itemInner: {
        backgroundColor: "#141628",
        alignItems: "center",
        padding: 18,
        borderRadius: 12,
    },
});