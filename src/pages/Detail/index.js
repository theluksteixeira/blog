import { Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, share, Share, Modal } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";
import LinkWeb from "../../componentes/LinkWeb";

export default function Detail() {
    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState({});
    const [links, setLinks] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [openLink, setOpenLink] = useState({});

    useEffect(() => {
        async function getPost() {
            const response = await api.get(`api/post/${route.params?.id}?populate=cover,category,Opcoes`);
            setPost(response.data.data);
            setLinks(response.data?.data?.attributes?.Opcoes);
        }

        getPost();
    }, []);

    //antes do usuario ver o conteudo e ele é sincrono.
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                <TouchableOpacity onPress={handleShare} name="share" size={25} color="#fff"></TouchableOpacity>;
            },
        });
    }, [navigation, post]);

    async function handleShare() {
        try {
            const result = await Share.share({
                message: `
            
            Confere essse post: ${post?.attributes?.title}
            
            ${post?.attributes?.description}

            Vi lá no app devpost!
            `,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("ACTIVY Type");
                } else {
                    console.log("Compartilhado com sucesso");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("fechou modal");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenLink(Link) {
        setModalVisible(true);
        setOpenLink(Link);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                resizeMode="cover"
                style={styles.cover}
                source={{ uri: `http://172.28.234.98:1337${data?.attributes?.cover?.data?.attributes?.url}` }}
            ></Image>

            <Text style={styles.title}>{post?.attributes?.title}</Text>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>{post?.attributes?.description}</Text>

                {links.length > 0 && <Text style={styles.subTitle}>Links</Text>}

                {links.map((Link) => (
                    <TouchableOpacity
                        key={Link.id}
                        style={styles.link}
                        onPress={() => {
                            handleOpenLink(Link);
                        }}
                    >
                        <Feather name="link" color="#1e4687" size={14} />
                        <Text>{Link.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal animationType="slide" visible={modalVisible} transparent={true}>
                <LinkWeb
                    Link={openLink?.url}
                    title={openLink?.name}
                    closeModal={() => setModalVisible(false)}
                ></LinkWeb>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    cover: {
        width: "100%",
        height: 230,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 14,
        marginTop: 18,
        paddingHorizontal: 12,
    },
    content: {
        paddingHorizontal: 12,
    },
    description: {
        lineHeight: 20,
    },
    subTitle: {
        fontWeight: "bold",
        marginTop: 14,
        fontSize: 18,
        marginBottom: 6,
    },
    linkButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    linkText: {
        color: "#1e4687",
        fontSize: 16,
        marginLeft: 6,
    },
});
