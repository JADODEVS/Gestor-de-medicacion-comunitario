import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout(){
    return(
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
        
                {/* Pantalla principal */}
                <Stack.Screen
                name="index" 
                options={{
                    animation: "slide_from_left",
                    animationDuration: 300
                }}
                />

                {/* Pantalla de registro */}
                <Stack.Screen
                name="signUp/index" 
                options={{
                    animation: "slide_from_right",
                    animationDuration: 300
                }}
                />

                {/* DashboardFamily */}
                <Stack.Screen
                name="dashboardFamily/index" 
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 300
                }}
                />

                <Stack.Screen
                name="viewPatientsFamily/index"
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 300
                }}
                />

                <Stack.Screen
                name="CreatePatientFamily/index"
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 300
                }}
                />

                <Stack.Screen
                name="profile/index"
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 300
                }}
                />

            </Stack>
        </SafeAreaProvider>
    )
}