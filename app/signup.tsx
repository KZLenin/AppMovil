import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import InputFields from '@/components/InputFields'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import Constants from 'expo-constants'

type Props = {}

type FormData = {
  nombre: string
  apellido: string
  direccion: string
  celular: string
  email: string
  password: string
}

const SignUpScreen = (props: Props) => {
  const {control,handleSubmit,formState: { errors },} = useForm<FormData>()
  const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL

  const onSubmit = handleSubmit(
    async (data) => {
      await registro(data)
      router.push('/verifyEmail')
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
  const registro = async (data: FormData) => {
    try {
        
      const url = "http://192.168.1.45:3000/api/registro" // 👇 Ojo con esto más abajo
      const respuesta = await axios.post(url, data)

      Toast.show({
        type: 'success',
        text1: respuesta.data.msg || 'Registro exitoso',
        position: 'bottom'
      })
    } catch (error: any) {
      const errorMsg = error?.response?.data?.msg || 'Error desconocido'
      Toast.show({
        type: 'error',
        text1: errorMsg,
        position: 'bottom'
      })
    }
  }
  return (
    <>
    <Stack.Screen options={{headerTitle: '', headerLeft: ()=> (
      <TouchableOpacity onPress={()=> router.back()}>
        <Ionicons name = 'close' size={24} color={Colors.black}/>
      </TouchableOpacity>
    ) }}/>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Crear una Cuenta</Text>
        <InputFields label="Nombre" name="nombre" control={control} rules={{ required: 'El nombre es obligatorio' }} placeholder="Ingresa tu nombre"/>
        <InputFields label="Apellido" name="apellido" control={control} rules={{ required: 'El apellido es obligatorio' }} placeholder="Ingresa tu apellido"/>
        <InputFields label="Dirección" name="direccion" control={control} rules={{ required: 'La dirección es obligatoria' }} placeholder="Ingresa tu direccion"/>
        <InputFields label="Celular" name="celular" control={control} rules={{ required: 'El celular es obligatorio' }} keyboardType="phone-pad" placeholder="Ingresa tu telefono"/>
        <InputFields label="Correo" name="email" control={control} rules={{ required: 'El correo es obligatorio' }} keyboardType="email-address" placeholder="Ingresa tu correo"/>
        <InputFields label="Contraseña" name="password" control={control} rules={{ required: 'La contraseña es obligatoria' }} secureTextEntry placeholder="Ingresa tu contraseña"/>

        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
          <Text style={styles.btnTxt}>Crear Cuenta</Text>
        </TouchableOpacity>
        <Text style={styles.loginTxt}>
          ¿Ya tienes una cuenta?{' '}
          <Link href={"/signin"} asChild>
            <Text style={styles.loginTxtSpan}>Ingresar</Text>
          </Link>
        </Text>
        <View style={styles.divider}/>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: '600'
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30
  }
})
