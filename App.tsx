import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  Screen1, 
  Screen11,
  Screen12, 
  Screen3,
  Screen4, 
  Screen5, 
  Screen6,
  Screen7, 
  Screen8, 
  Screen9,
  VideoPlayer,
  LiveTv
} from './screens';

import SplashScreen from 'react-native-splash-screen'
import { Provider } from "react-redux"
import {store} from './shared'
import { View } from 'react-native'
import FlashMessage from "react-native-flash-message";



function App(): React.JSX.Element {
  const Stack= createNativeStackNavigator()
  return (
   
    <Provider store={store}>
      <View style={{flex:1}}>
      <NavigationContainer  
        onReady={() => SplashScreen.hide()}
      >
        <Stack.Navigator initialRouteName='Screen1'>
          <Stack.Screen 
            name='Screen1'
            component={Screen1}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen1.1'
            component={Screen11}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen1.2'
            component={Screen12}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen3'
            component={Screen3}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen4'
            component={Screen4}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen5'
            component={Screen5}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen6'
            component={Screen6}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen7'
            component={Screen7}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen8'
            component={Screen8}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen9'
            component={Screen9}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen13'
            component={VideoPlayer}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Screen14'
            component={LiveTv}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> 
      <FlashMessage position="top" />
      </View>
    </Provider>

  )
}

export default App;
