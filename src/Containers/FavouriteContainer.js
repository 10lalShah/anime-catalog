import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import AnimeCard from '@/Components/AnimeCard'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { useTheme } from '@/Hooks'

const FavouriteContainer = ({ navigation }) => {
  const { Images } = useTheme()
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

  const RenderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Image source={Images.pikachu} style={{ height: 200, width: 200 }} />
        <Text category="s1">Uh ohh, nothing here</Text>
      </View>
    )
  }

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  )
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Favourite Anime" />
      <FlatList
        data={favourites}
        renderItem={renderAnimeList}
        ListEmptyComponent={<RenderEmptyList />}
      />
    </SafeAreaView>
  )
}

export default FavouriteContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(100),
  },
})
