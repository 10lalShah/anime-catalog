import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer, ListContainer } from '@/Containers'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'


const AiringIcon = style => <Icon {...style} name="film-outline" />
const CompleteIcon = style => <Icon {...style} name="flag" />
const UpcomingIcon = style => <Icon {...style} name="calendar-outline" />

const Tab = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index])
  }

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="Airing" icon={AiringIcon} />
        <BottomNavigationTab title="Complete" icon={CompleteIcon} />
        <BottomNavigationTab title="Upcoming" icon={UpcomingIcon} />
      </BottomNavigation>
    </SafeAreaView>
  )
}

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="Airing"
        component={ListContainer}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Complete"
        component={ListContainer}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={ListContainer}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
