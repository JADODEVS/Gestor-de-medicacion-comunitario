import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";

export default function Patient(){

    function clamp(val: number, min: number, max: number) {
        return Math.min(Math.max(val, min), max);
    }

    const { width, height } = Dimensions.get('screen');

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        ],
    }));

    const maxTranslateX = width / 2 + 30;
    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
        prevTranslationX.value = translationX.value;
        })
        .onUpdate((event) => {

        translationX.value = clamp(
            prevTranslationX.value + event.translationX,
            -maxTranslateX,
            0
        );
        })
        .onEnd((event) => {
            const velocity = event.velocityX;
            if (translationX.value < -maxTranslateX + 80 || velocity < -1000) {
                translationX.value = withTiming(-maxTranslateX, { duration: 300 });
            } else {
                translationX.value = withTiming(0, { duration: 300 });
            }
        })
        .runOnJS(true);

    return(
        <View style={styles.container}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.containerPatient, {width: width * 0.9}, animatedStyles]}>
                </Animated.View>
            </GestureDetector>

            <Animated.View style={[styles.deleteButton, {width: 50}]}>
                <Ionicons name="trash" size={24} color="#ffffff" />
            </Animated.View>

            <Animated.View style={[styles.deleteButton, {width: 50}]}>
                <Ionicons name="trash" size={24} color="#ffffff" />
            </Animated.View>

            <Animated.View style={[styles.deleteButton, {width: 50}]}>
                <Ionicons name="trash" size={24} color="#ffffff" />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    containerPatient: {
        backgroundColor: "#000000",
        height: 50
    },
    deleteButton: {
        backgroundColor: '#ff0000',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editPatientButton: {

    },
    addMedicineButton: {

    }
})