import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import InputFields from '@/components/InputFields'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import useFetch from '@/hooks/useFetch'
import Constants from 'expo-constants'

type Props = {}

type FormData = {
  email: string
  password: string
}

const SignInScreen = (props: Props) => {
  const {control,handleSubmit,formState: { errors },} = useForm<FormData>()
  const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL
  const {fetchDataBackend} = useFetch()

  const loginUser = async (data: FormData) => {
    const url = `${BACKEND_URL}/login`
    try {
      const response = await fetchDataBackend(url, data, 'POST')
      if (response?.success) {
        router.push('/')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error de autenticación',
          text2: response?.message || 'Credenciales incorrectas',
          position: 'bottom'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error del servidor',
        text2: 'No se pudo conectar al backend',
        position: 'bottom'
      })
      console.error('Login error:', error)
    }
  }

  const onSubmit = handleSubmit(
    (data) => {
    console.log('Formulario válido:', data)
    loginUser(data)
    },
    () => {
    Toast.show({
        type: 'error',
        text1: 'Formulario incompleto',
        text2: 'Revisa los campos obligatorios',
        position: 'bottom'
    })
    }
  )
  return (
    <>
    <Stack.Screen options={{headerTitle: '', headerLeft: ()=> (
      <TouchableOpacity onPress={()=> router.back()}>
        <Ionicons name = 'close' size={24} color={Colors.black}/>
      </TouchableOpacity>
    ) }}/>
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <InputFields label="Correo electrónico"
          name="email"
          control={control}
          rules={{ required: 'El correo es obligatorio' }}
          placeholder="Ingresa tu correo"
          autoCapitalize="none"
          keyboardType="email-address"
        />

      <InputFields
          label="Contraseña"
          name="password"
          control={control}
          rules={{ required: 'La contraseña es obligatoria' }}
          placeholder="Ingresa tu Contraseña"
          secureTextEntry
        />

      <Link href={"/forgotPassword"} asChild>
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotTxt}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnTxt}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.loginTxt}>
        ¿Aún no tienes una cuenta?{' '}
        <Link href={"/signup"} asChild>
          <Text style={styles.loginTxtSpan}>Registrarse</Text>
        </Link>
      </Text>
      
      <View style={styles.divider}/>
    </View>
    </>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor: Colors.background
  },
  title: {
    fontSize:24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btn:{
    backgroundColor:Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom:20
  },
  btnTxt:{
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  loginTxt:{
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24
  },
  loginTxtSpan:{
    color: Colors.primary,
    fontWeight: '600'
  },
  divider:{
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom:30
  },
  forgotBtn: {
    marginBottom: 30,
    alignSelf: "flex-start"
  },
  forgotTxt: {
    color: Colors.primary,
    fontWeight: '600',
  }
})