/**
 * AlertView is a simple alert to display message on screen
 *
 * Use Case
 * First add the AlertView component at same level of Stack Component at App.tsx
 *  <AlertView />
 *
 * show the alert from any ts file or on button action
 * AlertView.show('Simple alert Message', AlertType.SUCCESS, 'Thanks')
 *
 */

import React, { Component } from 'react'
import AlertComponent, { AlertType } from './AlertComponent'

interface errorProps {}
interface errorState {
  alertMessage: string
  visible: boolean
  alertType: AlertType
  errorTitle?: string
  successTitle?: string
  okTitle?: string
}
export default class AlertView extends Component<errorProps, errorState> {
  static shared: any

  constructor(props: errorProps) {
    super(props)

    this.state = {
      visible: false,
      alertMessage: '',
      alertType: AlertType.SUCCESS,
      errorTitle: 'Error',
      successTitle: 'Success',
      okTitle: 'Ok'
    }

    AlertView.shared = this
  }

  static show(
    alertMessage: string,
    alertType: AlertType,
    okTitle?: string,
    errorTitle?: string,
    successTitle?: string
  ) {
    setTimeout(() => {
      this.shared._show(alertMessage, alertType, okTitle, errorTitle, successTitle)
    }, 200)
  }

  _show(alertMessage: string, alertType: AlertType, okTitle?: string, errorTitle?: string, successTitle?: string) {
    this.setState({
      visible: true,
      alertMessage: alertMessage,
      alertType: alertType,
      okTitle: okTitle ? okTitle : this.state.okTitle,
      errorTitle: errorTitle ? errorTitle : this.state.errorTitle,
      successTitle: successTitle ? successTitle : this.state.successTitle
    })
  }
  _hide() {
    this.setState({ visible: false })
  }

  render() {
    const { errorTitle, successTitle, alertType, alertMessage, okTitle, visible } = this.state
    let title = this.state.alertType === AlertType.ERROR ? errorTitle : successTitle
    return (
      <AlertComponent
        visible={visible}
        onPressOk={() => this._hide()}
        alertTitle={title!}
        alertMsg={alertMessage}
        alertType={alertType}
        okTitle={okTitle!}
      />
    )
  }
}
