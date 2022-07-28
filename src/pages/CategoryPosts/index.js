import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function CategoryPosts() {
    const navigation = useNavigation();
    const route = useRoute();
    const [posts, setposts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.title === "" ? "Categoria" : route.params?.title,
        });
        setposts(response.data?.data?.attributes?.posts?.data);
    }, [navigation]);

    useEffect(() => {
        async function loadPosts() {
            const response = await api.get(
                `api/categories/${route.params?.id}?fields=name&populate=posts, posts.cover`
            );
        }
    }, []);

    function handleBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {posts.length === 0 && (
                <View style={styles.warningContainer}>
                    <Text style={styles.warning}>Essa categoria ainda noa possui nenhum post.</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.textButton}> Encontrar posts</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <PostItem data={item} />}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    warningContainer: {
        alignItems: "center",
    },
    warning: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        backgroundColor: "#162123",
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginTop: 12,
        borderRadius: 4,
    },
    textButton: {
        color: "#fff",
    },
});
