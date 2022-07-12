import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function getFavorite() {
    const data = await AsyncStorage.getItem("@favCategory");

    if (data !== null) {
        const response = await api.get(`/api/categories/${data}fileds=name&populate=posts,post.cover`);
        return response.data?.data?.attribute?.posts?.data;
    } else {
        return [];
    }
}

export async function setFavorite(category) {
    await AsyncStorage.setItem("@favCategory", String(category));

    const response = await getFavorite();

    return response;
}
