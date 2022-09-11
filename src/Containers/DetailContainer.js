import { View, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import { scale } from 'react-native-size-matters'
import { addToFav, removeFromFav } from '@/Store/Favourites'
import { useDispatch, useSelector } from 'react-redux'
import { ExplicitWarning } from '@/Components'


const WIDTH = Dimensions.get('window').width

const DetailContainer = ({ route, navigation }) => {
  const { showId, title, score, images, rating } = route.params
  const favourites = useSelector(state => state.favourites)
  const dispatch = useDispatch()
  const [animeDetail, setAnimeDetail] = useState({})

  const isFavourite = favourites.some(
    favAnime => favAnime.mal_id === animeDetail.mal_id,
  )

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const { data, status } = await axios.get(
          `https://api.jikan.moe/v4/anime/${showId}/full`,
        )
        setAnimeDetail(data.data)
      } catch (error) {
        console.log('ERROR:', error)
      }
    }
    fetchShowDetail()
  }, [showId])

  const manageFavourite = () => {
    if (isFavourite) {
      // remove from redux store
      dispatch(removeFromFav(animeDetail))
    } else {
      // add to redux store
      dispatch(addToFav(animeDetail))
    }
  }

  const BackIcon = props => <Icon {...props} name="arrow-back" />
  const HeartIcon = props => (
    <Icon
      {...props}
      name={isFavourite ? 'heart' : 'heart-outline'}
      fill="#fb0d04"
    />
  )

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
  const renderRightAction = () => (
    <TopNavigationAction icon={HeartIcon} onPress={() => manageFavourite()} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        alignment="center"
        title={props => (
          <Text
            {...props}
            category="h6"
            numberOfLines={2}
            style={styles.topBarTitle}
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
            <Text category="h6" style={[styles.title]}>{title}</Text>
            {rating === 'R+ - Mild Nudity' && <ExplicitWarning />}
          </View>
          <View style={[styles.subInfoContainer]}>
            <View style={[styles.infoCell, styles.borderSide]}>
              <View style={[styles.iconContainer]}>
                <Icon style={styles.icon} fill="#FAD02C" name="star" />
                <Text category="label">Rating</Text>
              </View>
              <Text category="s2">{score || '-'}</Text>
            </View>
            <View style={[styles.infoCell, styles.borderSide]}>
              <View style={[styles.iconContainer]}>
                <Icon style={styles.icon} fill="#8F9BB3" name="film" />
                <Text category="label">Episode(s)</Text>
              </View>
              <Text category="s2">{animeDetail.episodes || '-'}</Text>
            </View>
            <View style={[styles.infoCell]}>
              <View style={[styles.iconContainer]}>
                <Icon style={styles.icon} fill="#fb0d04" name="award" />
                <Text category="label">Ranking</Text>
              </View>
              <Text category="s2">#{animeDetail.rank || '-'}</Text>
            </View>
          </View>
          <View style={[styles.showTimeContainer]}>
            <Text category="s2">
              Show time : {animeDetail?.broadcast?.string || '-'}
            </Text>
          </View>
          <View style={[styles.storyContainer]}>
            <Text category="h6" style={[styles.synopsisStyle]}>
              Synopsis
            </Text>
            <Text category="p1" style={[styles.synopsisStyle]}>
              {animeDetail.synopsis}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailContainer

const styles = StyleSheet.create({
  topBarTitle: { width: 200, textAlign: 'center' },
  imageContainer: {},
  imageStyle: {
    width: WIDTH,
    height: 300,
  },
  infoContainer: {
    padding: scale(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  title:{
    paddingRight: scale(5)
  },
  showTimeContainer: {
    marginVertical: scale(5),
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
  synopsisStyle: {
    textAlign: 'justify',
    paddingTop: scale(10),
  },
  storyContainer: {
    margin: scale(5),
  },
  iconContainer: { justifyContent: 'center', alignItems: 'center' },
  icon: {
    width: 28,
    height: 28,
  },
})
