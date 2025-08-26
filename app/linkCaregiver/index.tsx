import { StyleSheet,View, Text, TextInput, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import Menu from "../../components/Menu";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Link Caregiver</Text>

                <View style={styles.icons}>
                    <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
                    <Ionicons name="mail-unread-outline" size={24} color="#333" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const screenHeigth = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.02,
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