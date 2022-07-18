import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { CategoryItem } from "../../componentes/CategoryItem";
import { getFavorite, setFavorite } from "../../services/favorite";
import FavoritePost from "../../componentes/FavoritePost";

export default function Home() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [favCategory, setFavCategory] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                console.log("aaaaagggg");
                const category = await api.get("api/categories?populate=icon");
                console.log(category.data.data);
                setCategories(category.data.data);
            } catch (error) {
                console.log(error);
            }
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
        setFavCategory(response);
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
                        contentContainerStyle={{ paddingEnd: 18 }}
                        data={favCategory}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <FavoritePost data={item}></FavoritePost>}
                    ></FlatList>
                )}

                <Text style={[styles.title, { marginTop: favCategory.length > 0 ? 14 : 46 }]}> Conteúdo em alta</Text>
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
    main: {
        backgroundColor: "#fff",
        flex: 1,
        marginTop: -30,
    },
    title: {
        fontSize: 21,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontWeight: "bold",
        color: "#162133",
    },
});
