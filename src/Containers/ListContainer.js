import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimeCard from '@/Components/AnimeCard'
import { Spinner } from '@ui-kitten/components'
import { Icon, Input, Text } from '@ui-kitten/components'
import { useDebounce } from '@/Hooks'

const ListContainer = ({ navigation }) => {
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
        `https://api.jikan.moe/v4/anime?page=${page}&?status=${showStatus}&q=${debouncedSearch}`,
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
    if (debouncedSearch) fetchAnime()
  }, [page, navigation, debouncedSearch])

  const loadMore = () => {
    if (page < lastPage) {
      setPage(page + 1)
    }
  }


  const renderAnimeList = ({ item }) => {
    const { score, year, title, images, rating } = item
    return (
      <AnimeCard
        title={title}
        rating={rating}
        year={year}
        score={score}
        images={images}
      />
    )
  }
  const renderIcon = props => <Icon {...props} name={'search'} />
  return (
    <View>
      <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
        <Input
          value={searchText}
          placeholder="Search Anime"
          accessoryLeft={renderIcon}
          onChangeText={nextValue => setSearchText(nextValue)}
        />
      </View>
      <FlatList
        data={animeList}
        renderItem={renderAnimeList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <Spinner size="giant" />}
        ListFooterComponentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
        }}
      />
    </View>
  )
}

export default ListContainer
