import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const VerifyEmail = () => {
  return (
    <>
      <Stack.Screen options={{
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Ionicons name='close' size={24} color={Colors.black} />
          </TouchableOpacity>
        )
      }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('@/assets/images/verifyEmail.png')}
            style={styles.image}
            resizeMode='contain'
          />
          <Text style={styles.title}>
            ¡Ya casi estamos! Revisa tu correo y haz clic en el botón para validar tu cuenta y continuar.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.replace('/signin')}>
            <Text style={styles.btnTxt}>Ingresar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
    marginBottom: 40,
    lineHeight: 28,
    letterSpacing: 0.5
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
})
