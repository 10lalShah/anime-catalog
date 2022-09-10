import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  FavouriteContainer,
  ListContainer,
  StartupContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Screen name="Startup" component={StartupContainer} />
        <Drawer.Navigator screenOptions={{ headerShown: true }}>
          <Drawer.Screen name="List" component={MainNavigator} />
          <Drawer.Screen name="Favourite" component={FavouriteContainer} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
