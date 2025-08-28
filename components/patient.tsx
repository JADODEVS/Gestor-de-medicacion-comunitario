import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Feather, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';

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

    const maxTranslateX = width / 2 + 15;
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
                    {/* Patient Info Here */}
                    <Text>Patient Name</Text>
                    <Text>Patient Age</Text>
                </Animated.View>
            </GestureDetector>

            <TouchableOpacity activeOpacity={0.5}>
                <Animated.View style={[styles.editPatientButton, animatedStyles]}>
                    <Entypo  name="eye" size={24} color="#000000" />
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
                <Animated.View style={[styles.addMedicineButton, animatedStyles]}>
                    <MaterialCommunityIcons name="pill" size={24} color="#000000" />
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
                <Animated.View style={[styles.deleteButton, animatedStyles]}>
                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="#ffffff" />
                </Animated.View>  
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 10,
    },
    containerPatient: {
        backgroundColor: "#48B0FF",
        height: 60,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
    },
    deleteButton: {
        backgroundColor: '#FF4747',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 10
    },
    editPatientButton: {
        backgroundColor: '#48B0FF',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 10
    },
    addMedicineButton: {
        backgroundColor: '#48B0FF',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 10
    }
})