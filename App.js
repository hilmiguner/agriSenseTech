import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import MainScreen from "./screens/MainScreen";


function App() {
  return(
    <SafeAreaProvider>
      <MainScreen/>
    </SafeAreaProvider>
  );
}

export default App;