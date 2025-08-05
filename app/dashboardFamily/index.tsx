import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

export default function Index() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loaded, error] = useFonts({
    'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf')
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text >Volver, esto es DashboardFamily<Link style={styles.textSignUp} href="/">Sign In</Link></Text>

    </SafeAreaView>
  );
}

const screenHeigth = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.1,
    backgroundColor: '#A5D8FF',
    alignItems: 'center',
  },
  textSignUp: {
    color: '#2600FF'
  }
});
