import { Button, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

function HomeScreen() {
  const nav = useNavigation()
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'white'} />
      <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        <View style={{ width: '50%' }}>
          <Pressable
            onPress={() => { nav.navigate('Details') }}
            android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
            style={{
              elevation: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(13, 146, 235)',
              paddingHorizontal: 20, 
              paddingVertical: 10,
              borderRadius: 4,
              overflow: 'hidden',
              width: '100%',
              marginVertical: 20
            }}
          >
            <Text style={{ color: 'white',fontWeight:'700', fontSize: 13, fontFamily: 'monospace' }}>{'Go To Details Page'.toUpperCase()}</Text>
          </Pressable>
          <Button title="Details" onPress={() => { nav.navigate('Details') }} />
        </View>
      </View>
    </View>
  )
}


function DetailsScreen() {
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  )
}

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
