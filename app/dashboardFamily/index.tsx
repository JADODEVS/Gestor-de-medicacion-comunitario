import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import Menu from "../../components/Menu";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";


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
      {/* <Text >Volver, esto es DashboardFamily<Link style={styles.textSignUp} href="/">Sign In</Link></Text> */}
      <View style={styles.header}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.icons}>
        <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
        <Ionicons name="mail-unread-outline" size={24} color="#333" />
      </View>
    </View>
    <Menu />
    </SafeAreaView>
  );
}

const screenHeigth = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.05,
    backgroundColor: '#A5D8FF',
    alignItems: "center",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between", // separa título e iconos
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#000000ff",
    borderBottomWidth: 1, // línea inferior
    borderBottomColor: "#000000ff",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
