import { StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';

export default function Index() {

  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [rol, setRol] = useState('select')
  const [userPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.arrowLeft}>
          <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.navigate('/')} />
        </View>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-jados.png')}
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

          <Text style={styles.textInput}>Name</Text>
          <TextInput
            placeholder='Enter name'
            onChangeText={setUserEmail}
            keyboardType='default'
            style={styles.inputStyleMail}
          />

          <Text style={styles.textInput}>Rol</Text>
          <Picker
            selectedValue={rol}
            style={styles.inputStyleMail}
            onValueChange={(itemValue) => setRol(itemValue)}
          >
            <Picker.Item label="select" value="select" />
            <Picker.Item label="cuidador" value="cuidador" />
            <Picker.Item label="familiar" value="familiar" />
          </Picker>

          <Text style={styles.textInput}>Phone</Text>
          <TextInput
            placeholder='Enter phone number'
            onChangeText={setUserEmail}
            keyboardType='number-pad'
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

          <Text style={styles.textInput}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Re-enter your password'
              onChangeText={setUserPassword}
              keyboardType='visible-password'
              style={styles.inputStylePassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          

        </KeyboardAvoidingView>

        <TouchableOpacity style={styles.buttonSignUp} activeOpacity={0.7} onPress={() => router.navigate('/dashboardFamily')}>
          <Text style={styles.textButtonSignIn}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={styles.containerView}>
          <View style={styles.childView}></View>
          <Text>SIGN UP WITH</Text>
          <View style={styles.childView}></View>
        </View>

        <Image
          style={styles.googleIcon}
          source={require('../../assets/icon-google-48.png')}
        />

        <Text style={[styles.textSubtitle, styles.textForgot]} >Have an account? <Link style={styles.textSignUp} href="/">Sign In</Link></Text>
      </ScrollView>
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
    paddingTop: screenHeigth * 0.07,
    backgroundColor: '#A5D8FF',
    alignItems: 'center',
  },
  containerScroll:{
    flex: 1
  },
  arrowLeft: {
    alignItems: 'flex-start',
    width: screenWidth,
    paddingLeft: screenWidth * 0.08
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
  buttonSignUp:{
    backgroundColor: '#000000',
    width: screenWidth * 0.6,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 20,
    marginTop: 30
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
