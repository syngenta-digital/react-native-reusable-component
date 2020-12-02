import CryptoJS from 'crypto-js'

export function encryptString(message: string, key: string) {
  let cipherText = CryptoJS.AES.encrypt(message, key)
  return cipherText.toString()
}

export function decryptString(encryptedMessage: string, key: string) {
  let bytes = CryptoJS.AES.decrypt(encryptedMessage.toString(), key)
  let plaintext = bytes.toString(CryptoJS.enc.Utf8)
  return plaintext
}
