// components/Menu.tsx
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => router.push("/dashboardFamily/ViewPatientsFamily")}>
        <MaterialIcons name="diversity-2" size={25} color="#1d1d1dff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/Search")}>
        <MaterialIcons name="person-search" size={25} color="#1d1d1dff" />
      </TouchableOpacity>

      {/* Botón central */}
      <TouchableOpacity 
        style={styles.centerButton}
        onPress={() => router.push("/dashboardFamily")}
      >
        <MaterialIcons name="home" size={25} color="#1d1d1dff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/CreatePatientFamily")}>
        <MaterialIcons name="person-add" size={25} color="#1d1d1dff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/Profile")}>
        <MaterialIcons name="person" size={25} color="#1d1d1dff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#5C6B73",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    position: "absolute",
    bottom: 0,
    width: "95%",
    margin: 20,
  },
  centerButton: {
    backgroundColor: "#B4E1D6",
    padding: 15,
    borderRadius: 50,
    marginTop: -30, // lo hace flotar
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  }
});
