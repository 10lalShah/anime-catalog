import { View, Text } from 'react-native'
import React from 'react'
import {
  Icon,
  Input,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'

const FavouriteContainer = ({ navigation }) => {
  const BackIcon = props => <Icon {...props} name="menu-outline" />

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  )
  return (
    <View>
      <TopNavigation accessoryLeft={BackAction} title="Favourite Anime" />
    </View>
  )
}

export default FavouriteContainer
