import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-web";

import { useNavigation } from "@react-navigation/native";

export function CategoryItem({ data, favorite }) {
    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate("Category", { id: data.id, title: data?.attributes?.name });
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={handleNavigate} onLongPress={favorite}>
            <Image
                style={styles.icon}
                source={{ uri: `http://172.18.116.0:1337${data?.attributes?.icon?.data?.attributes?.url}` }}
            ></Image>

            <Text style={styles.name}>{data?.attributes?.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },
});
