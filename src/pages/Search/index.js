import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";
import PostItem from "../../componentes/PostItem";

export default function Search() {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [empty, setEmpty] = useState(false);

    async function handleSearchPost() {
        if (input === "") {
            alert("Digite algum nome");
            return;
        }

        const response = await api.get(`api/posts?filters[title][$containsi]=${input}&populate=cover`);

        if (response.data?.data.length === 0) {
            setEmpty(true);
            setPosts([]);
            return;
        }

        setPosts(response.data?.data);

        setEmpty(false);
        setInput("");
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="O que está procurando?"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                ></TextInput>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearchPost}>
                    <Feather name="search" size={25} color="#000"></Feather>
                </TouchableOpacity>
            </View>

            {empty && (
                <View>
                    <Text style={styles.emptyText}>Ops não enconrtamos nenhum post...</Text>
                </View>
            )}
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
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
        backgroundColor: "#fff",
        padding: 18,
    },
    containerInput: {
        flexDirection: "row",
        width: "100%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    input: {
        width: "85%",
        backgroundColor: "#c4c4c4",
        height: 45,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 8,
    },
    searchButton: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c4c4",
        height: 45,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        marginLeft: -1,
    },
    emptyText: {
        textAlign: "center",
    },
});
