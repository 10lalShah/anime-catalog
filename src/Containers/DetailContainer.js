import { View, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Icon,
  Text,
  Layout,
  MenuItem,
  OverflowMenu,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import { scale } from 'react-native-size-matters'

const WIDTH = Dimensions.get('window').width

const DetailContainer = ({ route, navigation }) => {
  const { showId, title, score, images } = route.params
  const [animeDetail, setAnimeDetail] = useState({})

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const { data, status } = await axios.get(
          `https://api.jikan.moe/v4/anime/${showId}/full`,
        )
        console.log('data ->', data)
        setAnimeDetail(data.data)
      } catch (error) {
        console.log('ERROR:', error)
      }
    }
    fetchShowDetail()
  }, [showId])

  const BackIcon = props => <Icon {...props} name="arrow-back" />
  const HeartIcon = props => <Icon {...props} name="heart-outline" />

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
  const renderRightAction = () => <TopNavigationAction icon={HeartIcon} />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        alignment="center"
        title={props => (
          <Text
            {...props}
            category="h6"
            numberOfLines={2}
            style={{ width: 200, textAlign: 'center' }}
          >
            {title}
          </Text>
        )}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightAction}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.imageContainer]}>
          <Image
            source={{ uri: images.jpg.image_url }}
            style={[styles.imageStyle]}
          />
        </View>
        <View style={[styles.infoContainer]}>
          <View style={[styles.titleContainer]}>
            <Text category="h6">{title}</Text>
          </View>
          <View style={[styles.subInfoContainer]}>
            <View style={[styles.infoCell, styles.borderSide]}>
              <Text category="label">Rating</Text>
              <Text category="s2">{animeDetail.score || '-'}</Text>
            </View>
            <View style={[styles.infoCell, styles.borderSide]}>
              <Text category="label">Episode</Text>
              <Text category="s2">{animeDetail.episodes || '-'}</Text>
            </View>
            <View style={[styles.infoCell]}>
              <Text category="label">Ranking</Text>
              <Text category="s2">#{animeDetail.rank || '-'}</Text>
            </View>
          </View>
          <View style={[styles.showTimeContainer]}>
            <Text category="s2">
              Show time : {animeDetail?.broadcast?.string || '-'}
            </Text>
          </View>
          <View style={[styles.storyContainer]}>
            <Text category="h6">Synopsis</Text>
            <Text category="p1">{animeDetail.synopsis}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailContainer

const styles = StyleSheet.create({
  imageContainer: {},
  imageStyle: {
    width: WIDTH,
    height: 300,
  },
  infoContainer: {
    padding: scale(10),
  },
  titleContainer: {
    marginHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  showTimeContainer: {
    marginHorizontal: scale(5),
  },
  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: scale(10),
  },
  infoCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  borderSide: {
    borderRightColor: 'black',
    borderRightWidth: 1,
  },
  storyContainer: {
    margin: scale(5),
  },
})
