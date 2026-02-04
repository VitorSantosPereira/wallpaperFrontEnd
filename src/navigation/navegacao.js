import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas
import Home from '../screens/home';
import Fotos from '../screens/fotos';
import Automacao from '../screens/automacao';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Fotos" component={Fotos} />
      <Stack.Screen name="Automacao" component={Automacao} />
    </Stack.Navigator>
  );
}