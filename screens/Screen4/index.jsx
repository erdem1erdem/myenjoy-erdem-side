import React from 'react'
import { View } from 'react-native'
import { CardDetails } from '../../components'

const Screen4 = ({route}) => {
  const {details} = route.params;
  return (
    <View>
        <CardDetails detail={details} />
    </View>
  )
}

export {Screen4}