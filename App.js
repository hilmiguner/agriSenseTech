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
import { Pressable, Text } from 'react-native';

function MainStack() {
  const MainStack = createNativeStackNavigator();
  
  const ctx = useContext(Context);
  const navigation = useNavigation();

  useEffect(() => {
    if(ctx.isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainScreen" }]
      });
    }
  }, [ctx.isAuthenticated]);

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
        options={{
          headerRight: () => (
            <Pressable onPress={() => { 
              ctx.logout(); 
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }]
              });
            }}>
              <Text>Log Out</Text>
            </Pressable>
          )
        }}
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