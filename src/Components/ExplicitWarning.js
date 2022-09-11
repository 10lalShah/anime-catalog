import React from 'react'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { scale } from 'react-native-size-matters'

const ExplicitWarning = () => {
  return (
    <View
      style={{
        backgroundColor: '#e86a90',
        borderRadius: scale(6),
        padding: scale(5),
        width: scale(100),
      }}
    >
      <Text category="label" style={{ color: 'white' }}>
        Explicit Content
      </Text>
    </View>
  )
}

export default ExplicitWarning
