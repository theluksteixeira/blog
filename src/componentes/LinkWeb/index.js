import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";

export default function LinkWeb({ Link, title, closeModal }) {
    return (
        <>
            <TouchableOpacity onPress={closeModal}>
                <Feather name="x" size={25} color="#fff" />
                <Text>Título do link</Text>
            </TouchableOpacity>
            <WebView source={{ uri: Link }}></WebView>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "#232630",
        marginTop: 60,
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        color: "#fff",
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "bold",
    },
});
