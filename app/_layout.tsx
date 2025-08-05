import { View, Text } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout(){
    return(
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Slot/>
        </SafeAreaProvider>
    )
}