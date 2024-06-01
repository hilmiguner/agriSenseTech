import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import ContextProvider, { Context } from './util/context';
import MainScreen from './screens/MainScreen';
import SignupScreen from './screens/SignupScreen';
import NewUserScreen from './screens/NewUserScreen';
import preloadImages from './util/preloading';
import { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RobotControlScreen from './screens/RobotControlScreen';
import CustomTabBar from './components/ui/CustomTabBar';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import WeedDetailScreen from './screens/WeedDetailScreen';
import WeedMap from './screens/WeedMap';

function MainStack() {
  const MainStack = createNativeStackNavigator();
  
  const ctx = useContext(Context);
  const navigation = useNavigation();

  useEffect(() => {
    if(ctx.isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }]
      });
    }
  }, [ctx.isAuthenticated]);

  return(
    <MainStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <MainStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ orientation: "portrait" }}
      />
      <MainStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ orientation: "portrait" }}
      />
      <MainStack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{ orientation: "portrait" }}
      />
      <MainStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ orientation: "portrait" }}
      />
      <MainStack.Screen
        name="RobotControlScreen"
        component={RobotControlScreen}
        options={{ orientation: "landscape_right" }}
      />
      <MainStack.Screen
        name="WeedDetailScreen"
        component={WeedDetailScreen}
        options={{ orientation: "portrait" }}
      /> 
      <MainStack.Screen
        name="WeedMap"
        component={WeedMap}
        options={{ orientation: "portrait" }}
      />      
    </MainStack.Navigator>
  );
}

function SettingsStack() {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='SettingsScreen' 
        component={SettingsScreen}
        options={{ orientation: "portrait" }}
      />
      <Stack.Screen
        name='HelpScreen'
        component={HelpScreen}
        options={{ orientation: "portrait" }}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props}/>} screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="MainScreen"
        component={MainScreen}
        options={{ orientation: "portrait" }}
      />
      <Tab.Screen 
        name="SettingsStack"
        component={SettingsStack}
        options={{ orientation: "portrait" }}
      />
    </Tab.Navigator>
  );
}

function App() {
  preloadImages();
  
  return(
      <GestureHandlerRootView style={{ flex: 1,}}>
        <ContextProvider>
          <NavigationContainer>
            <MainStack/>
          </NavigationContainer>
        </ContextProvider>
      </GestureHandlerRootView>
  );
}

export default App;