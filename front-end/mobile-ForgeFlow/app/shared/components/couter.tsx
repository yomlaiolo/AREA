import React from "react";
import { Platform, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

const centered: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    };

const SIZE = 100;
const FONT_SIZE = SIZE / 2;

const style = StyleSheet.create({
    container: {
        ...centered,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "green",
        },
    counter: {
        ...centered,
        width: SIZE,
        height: SIZE,
        borderRadius: 5,
        backgroundColor: "white",
        },
    numbertext: {
        color: "#ee7767",
        fontWeight: "bold",
        fontSize: FONT_SIZE,
        },
    buttonText: {
        color: "white",
        fontSize: FONT_SIZE,
        },
    button: {
        width: SIZE,
        height: SIZE,
        ...centered,
        },
    });

    export const Counter = () => {
        const [count, setCount] = React.useState(Platform.OS === "web" ? 0 : 1);
        const increment = () => {
            setCount(count + 1);
        };
        const decrement = () => {
            setCount(count - 1);
        }
        return (
            <View style={style.container}>
                <Pressable onPress={decrement} style={style.button}>
                    <Text style={style.buttonText}>-</Text>
                </Pressable>
                <View style={style.counter}>
                    <Text style={style.numbertext}>{count}</Text>
                </View>
                <Pressable onPress={increment} style={style.button}>
                    <Text style={style.buttonText}>+</Text>
                </Pressable>
            </View>
        );
    };