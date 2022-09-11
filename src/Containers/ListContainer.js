import {
  View,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Button,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimeCard from '@/Components/AnimeCard'
import {
  Icon,
  Text,
  Input,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { scale } from 'react-native-size-matters'
import { useDebounce, useTheme } from '@/Hooks'

const ListContainer = ({ navigation }) => {
  const { Images } = useTheme()
  const { index, routeNames } = navigation.getState()
  const [animeList, setAnimeList] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState()
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(searchText, 500)

  const fetchAnime = async () => {
    const showStatus = routeNames[index].toLowerCase()
    try {
      setLoading(true)
      const { data, status } = await axios.get(
        `https://api.jikan.moe/v4/anime?page=${page}&status=${showStatus}&q=${debouncedSearch}`,
      )
      setLastPage(data.pagination.last_visible_page)
      setAnimeList([...animeList, ...data.data])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('ERROR:', error)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [page, navigation, debouncedSearch])

  const loadMore = () => {
    if (page < lastPage) {
      setPage(page + 1)
    }
  }

  const BackIcon = props => <Icon {...props} name="menu-outline" />
  const renderIconLeft = props => <Icon {...props} name={'search'} />
  const renderIconRight = props => (
    <TouchableWithoutFeedback onPress={() => setSearchText('')}>
      <Icon {...props} name={'close-outline'} />
    </TouchableWithoutFeedback>
  )

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  )

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

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Search Anime" />
      <View style={styles.searchInputContainer}>
        <Input
          value={searchText}
          placeholder="Search Anime"
          accessoryLeft={renderIconLeft}
          accessoryRight={renderIconRight}
          size="large"
          onChangeText={nextValue => {
            setSearchText(nextValue)
            setAnimeList([])
          }}
        />
      </View>
      <FlatList
        data={animeList}
        renderItem={renderAnimeList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <Spinner size="giant" />}
        ListFooterComponentStyle={styles.footerComponentStyle}
        ListEmptyComponent={!loading && <RenderEmptyList />}
      />
    </SafeAreaView>
  )
}

export default ListContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    margin: scale(10),
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(100),
  },
  footerComponentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 200,
  },
})
