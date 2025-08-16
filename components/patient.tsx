import { View, Text, StyleSheet } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type PatientProps = {
  screenWidth: number;
};

export default function Patient({screenWidth} : PatientProps){
    const pan = Gesture.Pan().onEnd(() => {
        console.log("arrastrado")
    });
    return(
        <GestureDetector gesture={pan}>
            <View style={[styles.containerPatient, {width: screenWidth * 0.8}]}>
                <Text> this is an info patient </Text>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    containerPatient: {
        backgroundColor: "#000000",
        height: 50
    }
})