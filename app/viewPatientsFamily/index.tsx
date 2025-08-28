import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import Patient from '../../components/patient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const patients = Array.from({ length: 15 }, (_, i) => ({ id: i.toString() }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>View Patients</Text>
        <View style={styles.icons}>
          <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
          <Ionicons name="mail-unread-outline" size={24} color="#333" />
        </View>
      </View>

      <GestureHandlerRootView style={styles.containerPatient}>
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={() => <Patient />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const screenHeigth = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
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
  containerPatient: {
    flex: 1,
    width: screenWidth * 0.9,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
});
