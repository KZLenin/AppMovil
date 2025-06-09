import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import InputFields from '@/components/InputFields'


type Props = {}

const SignUpScreen = (props: Props) => {
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
        <InputFields placeholder='Nombre' placeholderTextColor={Colors.gray}/>
        <InputFields placeholder='Apellido' placeholderTextColor={Colors.gray}/>
        <InputFields placeholder='Direccion' placeholderTextColor={Colors.gray}/>
        <InputFields placeholder='Celular' placeholderTextColor={Colors.gray}/>
        <InputFields placeholder='Correo' placeholderTextColor={Colors.gray} autoCapitalize='none' keyboardType='email-address'/>
        <InputFields placeholder='Contrasena' placeholderTextColor={Colors.gray} secureTextEntry={true}/>
        <InputFields placeholder='Confirmar contrasena' placeholderTextColor={Colors.gray} secureTextEntry={true}/>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/verifyEmail')}>
          <Text style={styles.btnTxt}>Crear Cuenta</Text>
        </TouchableOpacity>
        <Text style={styles.loginTxt}>
          ¿Ya tienes una cuenta?{" "}
          <Link href={"/signin"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtSpan}>Ingresar</Text>
            </TouchableOpacity>
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
