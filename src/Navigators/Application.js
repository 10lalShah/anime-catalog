import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  Drawer,
  DrawerItem,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components'

import {
  FavouriteContainer,
  ListContainer,
  StartupContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const { Navigator, Screen } = createDrawerNavigator()

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Main" />
    <DrawerItem title="Favourites" />
  </Drawer>
)

export const DrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Screen
      name="Home"
      component={MainNavigator}
      options={{ headerShown: false }}
    />
    <Screen
      name="Favourite"
      component={FavouriteContainer}
      options={{ headerShown: false }}
    />
  </Navigator>
)

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        {/* <Stack.Screen name="Startup" component={StartupContainer} /> */}
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
