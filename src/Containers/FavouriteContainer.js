import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {
  Icon,
  Input,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import AnimeCard from '@/Components/AnimeCard'
import { useSelector } from 'react-redux'

const FavouriteContainer = ({ navigation }) => {
  const favourites = useSelector(state => state.favourites)

  const BackIcon = props => <Icon {...props} name="menu-outline" />
  const renderAnimeList = ({ item }) => {
    const { score, year, title, images, rating, mal_id: showId } = item
    return (
      <AnimeCard
        title={title}
        rating={rating}
        year={year}
        score={score}
        images={images}
        showId={showId}
      />
    )
  }

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  )
  return (
    <View style={{ flex: 1 }}>
      <TopNavigation accessoryLeft={BackAction} title="Favourite Anime" />
      <FlatList data={favourites} renderItem={renderAnimeList} />
    </View>
  )
}

export default FavouriteContainer
