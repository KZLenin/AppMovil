import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import InputFields from '@/components/InputFields'
import useFetch from '@/hooks/useFetch'
import Constants from 'expo-constants'

type FormData = {
    email: string
}

const forgotPassword = () => {
    const [loading, setLoading] = useState(false)

    const {control,handleSubmit,formState: { errors },} = useForm<FormData>()
    const {fetchDataBackend} = useFetch()

    const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL

    const sendMail = async (data: FormData) => {
      setLoading(true)
      const url = `${BACKEND_URL}/clientes/recuperarpassword`
      try {
      await fetchDataBackend(url, data, 'POST')
      Toast.show({
          type: 'success',
          text1: '¡Correo enviado exitosamente!',
          text2: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
          position: 'bottom'
      })
      router.push('/') // o redirige donde desees
      } catch (error: any) {
      Toast.show({
          type: 'error',
          text1: 'Error al enviar correo',
          text2: error.message || 'Inténtalo nuevamente',
          position: 'bottom'
      })
      }finally {
    setLoading(false)
  }
    }

    const onSubmit = handleSubmit(
        (data) => {
        console.log('Formulario válido:', data)
        sendMail(data)
        },
        () => {
        Toast.show({
            type: 'error',
            text1: 'Campos incompletos',
            text2: 'Por favor, completa el correo electrónico para continuar.',
            position: 'bottom'
        })
        }
    )

    return(
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
                    Introduce tu CORREO REGISTRADO y te enviaremos un código para restablecer tu contraseña
                  </Text>
                    <InputFields label="Correo electrónico"
                        name="email"
                        control={control}
                        rules={{ required: 'El correo es obligatorio' }}
                        placeholder="Ingresa tu correo"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                  <TouchableOpacity style={styles.btn} onPress={onSubmit} disabled={loading}>
                    <Text style={styles.btnTxt}>{loading ? 'Enviando...' : 'Enviar'}</Text>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAvoidingView>
        </>
    )
}

export default forgotPassword

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
