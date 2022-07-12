import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { CategoryItem } from "../../componentes/CategoryItem";
import { getFavorite, setFavorite } from "../../services/favorite";
import { FavoritePost } from "../../componentes/FavoritePost";

export default function Home() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [favCategory, setFavCategory] = useState([]);

    useEffect(() => {
        async function loadData() {
            console.log("aaaaagggg");
            const category = await api.get("/api/categories?populate=icon");
            console.log("2222");
            console.log(category);
            setCategories(category.data.data);
        }
        loadData();
    }, []);

    useEffect(() => {
        async function favorite() {
            const response = await getFavorite();
            setFavCategory(response);
        }
        favorite();
    }, []);

    async function handleFavorite(id) {
        const response = await setFavorite(id);

        alert("Categoria favoritada");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>DevBlog</Text>

                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Feather name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{ paddingRight: 12 }}
                style={styles.categories}
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />}
            ></FlatList>

            <View style={styles.main}>
                {favCategory.length !== 0 && (
                    <FlatList
                        style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
                        data={favCategory}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <FavoritePost data={item}></FavoritePost>}
                    ></FlatList>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232630",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24,
    },
    name: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: "bold",
    },
    categories: {
        maxHeight: 115,
        backgroundColor: "#efefef",
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9,
    },
});
