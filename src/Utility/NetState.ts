/**
 * NetState fetch network status using netinfo lib
 * 
 * Use case 
 * Using Listener 
    NetworkStatus.sharedInstance.initiateNetworkListener()
    NetworkStatus.sharedInstance.sendConnectionStatus = (netState: any) => {
      console.log("netState",netState)
    }

 *  Using Fetch Method
   let resp = await NetworkStatus.sharedInstance.checkFetchStatus()
    console.log('return call', resp)
 */
import NetInfo from '@react-native-community/netinfo'

interface connectionStatus {
  (status: Object): void
}

export default class NetworkStatus {
  static sharedInstance = new NetworkStatus()
  isOnline: any = false
  private unsubscribe: any = null
  sendConnectionStatus!: connectionStatus

  constructor() {
    this.unsubscribe = this.initiateNetworkListener()
  }

  initiateNetworkListener() {
    return NetInfo.addEventListener(state => {
      this.networkStatus(state)
    })
  }

  unsubscribeNetworkListener() {
    this.unsubscribe()
  }

  async checkFetchStatus() {
    const response = await NetInfo.fetch()
    this.isOnline = response.isConnected
    return response
  }

  networkStatus(status: any) {
    this.isOnline = status.isConnected
    this.sendConnectionStatus && this.sendConnectionStatus(status)
  }
}
