import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimeCard from '@/Components/AnimeCard'

const ListContainer = () => {
  const [animeList, setAnimeList] = useState([])
  const fetchAnime = async () => {
    try {
      const { data, status } = await axios.get(`https://api.jikan.moe/v4/anime`)
      setAnimeList(data.data)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [])

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

  return (
    <View>
      <FlatList data={animeList} renderItem={renderAnimeList} />
    </View>
  )
}

export default ListContainer
