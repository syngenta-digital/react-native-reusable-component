import AsyncStorage from '@react-native-community/async-storage'
import { decryptString, encryptString } from './Crypto'
import { Console } from './globals'

export const retrieveData = async (storageKey: any, secretCryptoKey: any) => {
  try {
    let value = await AsyncStorage.getItem(storageKey)

    if (value) {
      let dep = decryptString(value, secretCryptoKey)
      return dep
    }
  } catch (error) {
    Console.log('Error in getting retrieved data')
  }
}

export const storeData = async (storageKey: any, value: any, secretCryptoKey: any) => {
  try {
    let storeValue = encryptString(JSON.stringify(value), secretCryptoKey)
    await AsyncStorage.setItem(storageKey, storeValue)
  } catch (error) {
    Console.error('Error in setting stored data')
  }
}
