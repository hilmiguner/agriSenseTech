import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';


function App() {
  const MainScreenStack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <MainScreenStack.Navigator>
        <MainScreenStack.Screen
          name='MainScreen'
          component={MainScreen}
          options={{
            title: "Agri Sense Tech"
          }}
        />
      </MainScreenStack.Navigator>
    </NavigationContainer>
  );
}

export default App;