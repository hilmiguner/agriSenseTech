import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import ContextProvider from './util/context';
import MainScreen from './screens/MainScreen';
import SignupScreen from './screens/SignupScreen';
import NewUserScreen from './screens/NewUserScreen';
import preloadImages from './util/preloading';

function MainStack() {
  const MainStack = createNativeStackNavigator();

  return(
    <MainStack.Navigator>
      <MainStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
      />
    </MainStack.Navigator>
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