// components/Menu.tsx
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => router.push("/dashboardFamily/ViewPatientsFamily")}>
        <MaterialCommunityIcons name="account-group" size={30} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/Search")}>
        <MaterialIcons name="search" size={30} color="#333" />
      </TouchableOpacity>

      {/* Botón central */}
      <TouchableOpacity 
        style={styles.centerButton}
        onPress={() => router.push("/dashboardFamily")}
      >
        <MaterialIcons name="home" size={30} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/CreatePatientFamily")}>
        <FontAwesome5 name="user-plus" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/dashboardFamily/Profile")}>
        <MaterialIcons name="person" size={30} color="#333" />
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
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
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
