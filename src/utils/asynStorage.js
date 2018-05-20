import { AsyncStorage } from "react-native";
async function getItem(key: ?string): Promise {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return Promise.resolve(result);
    } else {
      const items = { items: [] };
      const result = await AsyncStorage.setItem(key, JSON.stringify(items));
      return Promise.resolve(result);
    }
  } catch (error) {
    return error;
  }
}

async function setItems(key: ?string, data: ?object): Promise {
  const items = JSON.stringify(data);
  try {
    const result = await AsyncStorage.setItem(key, items);
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(error);
  }
}

export { getItem, setItems };
