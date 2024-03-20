import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

async function storeStringData(key, string) {
    try {
        return await AsyncStorage.setItem(key, string);
    } catch (error) {
        Alert.alert(error.name, error.message);
    }
};

async function storeObjectData(key, object) {
    try {
        const jsonValue = JSON.stringify(object);
        return await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        Alert.alert(error.name, error.message);
    }
};

async function getStringData(key) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        Alert.alert(error.name, error.message);
    }
};

async function getObjectData(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        Alert.alert(error.name, error.message);
    }
};

async function removeItem(key) {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (error) {
        Alert.alert(error.name, error.message);
    }
};

export default {
    storeStringData,
    storeObjectData,
    getStringData,
    getObjectData,
    removeItem
};