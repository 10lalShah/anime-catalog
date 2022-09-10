import { View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'
import React from 'react'

const AnimeCard = ({ title, rating, year, score, images }) => {
  return (
    <Card style={{margin: 5}}>
      <View>
        <Text>
          {title} - {rating}
        </Text>
      </View>
    </Card>
  )
}

export default AnimeCard
