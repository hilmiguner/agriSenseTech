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
      />
      <MainStack.Screen
        name="SignupScreen"
        component={SignupScreen}
      />
      <MainStack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
      />
      <MainStack.Screen
        name="BottomTabs"
        component={BottomTabs}
      />
    </MainStack.Navigator>
  );
}

function SettingsStack() {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
      <Stack.Screen name='HelpScreen' component={HelpScreen} />
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
      />
      <Tab.Screen 
        name="RobotControlScreen"
        component={RobotControlScreen}
      />
      <Tab.Screen 
        name="SettingsStack"
        component={SettingsStack}
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