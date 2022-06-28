import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página HOME</Text>
            <Button title="Ir para detalhes" onPress={() => navigation.navigate("Detail")}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: 24,
    },
});
