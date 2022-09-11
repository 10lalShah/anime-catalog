import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components'

import { DetailContainer, FavouriteContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()
const MainDrawer = createDrawerNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen name="DetailScreen" component={DetailContainer} />
    </Stack.Navigator>
  )
}

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Search" />
    <DrawerItem title="Favourites" />
  </Drawer>
)

export const DrawerNavigator = () => (
  <MainDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <MainDrawer.Screen
      name="Home"
      component={MainNavigator}
      options={{ headerShown: false }}
    />
    <MainDrawer.Screen
      name="Favourite"
      component={FavouriteContainer}
      options={{ headerShown: false }}
    />
  </MainDrawer.Navigator>
)

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <MainStack />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
