import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RobotControlScreen from './screens/RobotControlScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';

function App() {
  const MainScreenStack = createNativeStackNavigator();
  return(
      <GestureHandlerRootView style={{ flex: 1,}}>
        <NavigationContainer>
          <MainScreenStack.Navigator>
            <MainScreenStack.Screen
              name='MainScreen'
              component={MainScreen}
              options={{
                title: "Agri Sense Tech"
              }}
            />
              <MainScreenStack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                  title: "Login",
                  headerShown: false,
                }}
              />
            <MainScreenStack.Screen
              name='RobotControlScreen'
              component={RobotControlScreen}
              options={{
                title: "Robot Control",
              }}
            />
          </MainScreenStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
  );
}

export default App;