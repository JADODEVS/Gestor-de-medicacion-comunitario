import { StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use, useState } from 'react';
import { useFonts } from 'expo-font';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {

  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loaded, error] = useFonts({
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf')
  })

  return (
    <SafeAreaView style={styles.container}>
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
          style={styles.inputStyleMail}
        />

        <Text style={styles.textInput}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Enter Password'
            onChangeText={setUserPassword}
            keyboardType='visible-password'
            style={styles.inputStylePassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        

      </KeyboardAvoidingView>

      <Text style={[styles.textSubtitle, styles.textForgot]} >Forget Password?</Text>

      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.7} onPress={() => router.navigate('/dashboardFamily')}>
        <Text style={styles.textButtonSignIn}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.containerView}>
        <View style={styles.childView}></View>
        <Text>SIGN IN WITH</Text>
        <View style={styles.childView}></View>
      </View>

      <Image
        style={styles.googleIcon}
        source={require('../assets/icon-google-48.png')}
      />

      <Text style={[styles.textSubtitle, styles.textForgot]} >Don't have an account? <Link style={styles.textSignUp} href="/signUp">Sign up</Link></Text>

    </SafeAreaView>
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
    marginBottom: screenHeigth * 0.05
  },
  containerInput: {
    width: screenWidth * 0.8
  },
  textInput: {
    marginTop: 30,
    fontSize: fontSizeTitle,
    fontFamily: fontFamilyText
  },
  inputStyleMail: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 5,
    borderBottomWidth: 1,
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
    paddingBottom: 5,
    marginBottom: 20
  },
  textButtonSignIn: {
    color: '#ffffff',
    fontSize: fontSizeTitle,
    fontFamily: fontFamilyButton
  },
  textSignUp: {
    color: '#2600FF'
  },
  googleIcon: {
    height: 35,
    objectFit: 'contain',
    marginBottom: 20
  },
  childView: {
    height: 2,
    width: screenWidth * 0.15,
    backgroundColor: '#000000',
    marginHorizontal: 10
  },
  containerView: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
    marginBottom: 10
  },
  iconVisibility: {
    height: 35,
    objectFit: 'contain',
    marginBottom: 20,
    color: '#000000' 
  },
  inputWrapper:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    marginBottom: 30
  },
  inputStylePassword: {
    flex: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 5,
    fontSize: fontSizePlaceholder,
    fontFamily: fontFamilyText
  },
});
