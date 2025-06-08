import { View, Text, TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {}

const InputFields = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <>
      <TextInput
      style={styles.inputField}
      {...props}
      />
    </>
  )
}

export default InputFields

const styles = StyleSheet.create({
    inputField:{
        backgroundColor: Colors.white,
        paddingVertical:12,
        paddingHorizontal:19,
        alignSelf:'stretch',
        borderRadius: 5,
        fontSize:16,
        color : Colors.black,
        marginBottom:20,
      }
})