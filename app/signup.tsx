import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import InputFields from '@/components/InputFields'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import Constants from 'expo-constants'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated'

type FormData = {
  nombre: string
  apellido: string
  direccion: string
  celular: string
  email: string
  password: string
}

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL

  const rotation = useSharedValue(0)

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1
      )
    } else {
      rotation.value = 0
    }
  }, [loading])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const onSubmit = handleSubmit(
    async (data) => {
      setLoading(true)
      const success = await registro(data)
      setLoading(false)
      if (success) {
        router.push('/verifyEmail')
      }
    },
    () => {
      Toast.show({
        type: 'error',
        text1: 'Formulario incompleto',
        text2: 'Revisa los campos obligatorios',
        position: 'bottom',
      })
    }
  )

  const registro = async (data: FormData) => {
    try {
      const url = 'https://unitex.up.railway.app/api/clientes/registro'
      const respuesta = await axios.post(url, data)

      Toast.show({
        type: 'success',
        text1: respuesta.data.msg || 'Registro exitoso',
        position: 'bottom',
      })
      return true
    } catch (error: any) {
      const errorMsg = error?.response?.data?.msg || 'Error desconocido'
      Toast.show({
        type: 'error',
        text1: errorMsg,
        position: 'bottom',
      })
      return false
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
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
          <InputFields
            label="Nombre"
            name="nombre"
            control={control}
            rules={{ required: 'El nombre es obligatorio' }}
            placeholder="Ingresa tu nombre"
          />
          <InputFields
            label="Apellido"
            name="apellido"
            control={control}
            rules={{ required: 'El apellido es obligatorio' }}
            placeholder="Ingresa tu apellido"
          />
          <InputFields
            label="Dirección"
            name="direccion"
            control={control}
            rules={{ required: 'La dirección es obligatoria' }}
            placeholder="Ingresa tu direccion"
          />
          <InputFields
            label="Celular"
            name="celular"
            control={control}
            rules={{ required: 'El celular es obligatorio' }}
            keyboardType="phone-pad"
            placeholder="Ingresa tu telefono"
          />
          <InputFields
            label="Correo"
            name="email"
            control={control}
            rules={{ required: 'El correo es obligatorio' }}
            keyboardType="email-address"
            placeholder="Ingresa tu correo"
          />
          <InputFields
            label="Contraseña"
            name="password"
            control={control}
            rules={{ required: 'La contraseña es obligatoria' }}
            secureTextEntry={true}
            placeholder="Ingresa tu contraseña"
          />
          <InputFields
            label="Confirmar contraseña"
            name="confirmPassword"
            control={control}
            rules={{
              required: 'La confirmación es obligatoria',
              validate: (value:String) =>
                value === control._formValues.password || 'Las contraseñas no coinciden'
            }}
            secureTextEntry={true}
            placeholder="Repite tu contraseña"
          />

          {loading ? (
            <View style={styles.spinnerContainer}>
              <Animated.View style={[styles.spinner, animatedStyle]} />
              <Text style={{ color: Colors.primary, marginTop: 10 }}>
                Registrando...
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={onSubmit}>
              <Text style={styles.btnTxt}>Crear Cuenta</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.loginTxt}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/signin" asChild>
              <Text style={styles.loginTxtSpan}>Ingresar</Text>
            </Link>
          </Text>
          <View style={styles.divider} />
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
    backgroundColor: Colors.background,
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
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: '600',
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderTopColor: Colors.primary,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
})
