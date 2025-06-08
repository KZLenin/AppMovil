import { StyleSheet,View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const SocialLoginButtons = (props: Props) => {
  return (
    <>
    <View style={styles.socialLoginWrapper}>
            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <Link href={"/signin"} asChild>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="mail-outline" size={20} color={Colors.black}/>
                <Text style={styles.btnTxt}>Continuar con correo</Text>
              </TouchableOpacity>
            </Link>
            </Animated.View>
          </View>
          <View style={styles.socialLoginWrapper}>
            <Animated.View entering={FadeInDown.delay(700).duration(500)}>
            <Link href={"/signin"} asChild>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="logo-google" size={20} color={Colors.black}/>
                <Text style={styles.btnTxt}>Continuar con Google</Text>
              </TouchableOpacity>
            </Link>
            </Animated.View>
          </View>
    </>
  )
}

export default SocialLoginButtons

const styles = StyleSheet.create({
    socialLoginWrapper:{
    alignSelf: 'stretch'
    },
    button:{
    flexDirection: 'row',
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 15
    },
    btnTxt:{
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
    },
})