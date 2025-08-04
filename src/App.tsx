import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFonts } from 'expo-font';

export default function App() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loaded, error] = useFonts({
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf')
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Image
          style={styles.logo}
          source={require('../assets/logo-jados.png')}
        />
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.containerInput}
        >

          <Text style={styles.textInput}>E-Mail</Text>
          <TextInput
            placeholder='Enter Email address'
            onChangeText={setUserEmail}
            keyboardType='email-address'
            style={styles.inputStyle}
          />

          <Text style={styles.textInput}>Password</Text>
          <TextInput
            placeholder='Enter Password'
            onChangeText={setUserPassword}
            keyboardType='visible-password'
            style={styles.inputStyle}
          />

        </KeyboardAvoidingView>

        <Text style={[styles.textSubtitle, styles.textForgot]} >Forget Password?</Text>

        <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.7}>
          <Text style={styles.textButtonSignIn}>SIGN IN</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get('window').width
const screenHeigth = Dimensions.get('window').height
const fontFamilyText = 'Nunito-SemiBold'
const fontFamilyButton = 'Nunito-Regular'
const fontSizeTitle = 20
const fontSizePlaceholder = 15
const fontSizeSubtitle = 13

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.1,
    backgroundColor: '#A5D8FF',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    objectFit: 'contain',
    marginBottom: screenHeigth * 0.1
  },
  containerInput: {
    width: screenWidth * 0.8
  },
  textInput: {
    fontSize: fontSizeTitle,
    fontFamily: fontFamilyText
  },
  inputStyle: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 5,
    borderBottomWidth: 1,
    marginBottom: 30,
    fontSize: fontSizePlaceholder,
    fontFamily: fontFamilyText
  },
  textSubtitle: {
    fontFamily: fontFamilyText,
    fontSize: fontSizeSubtitle
  },
  textForgot: {
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 30
  },
  buttonSignIn:{
    backgroundColor: '#000000',
    width: screenWidth * 0.6,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  textButtonSignIn: {
    color: '#ffffff',
    fontSize: fontSizeTitle,
    fontFamily: fontFamilyButton
  }
});
