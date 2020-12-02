export const Console = {
  log: (consoleMessage: any, consoleData?: any, consoleData1?: any) =>
    console.log(consoleMessage, consoleData, consoleData1),
  error: (consoleMessage: any, consoleData?: any, consoleData1?: any) =>
    console.error(consoleMessage, consoleData, consoleData1),
  warn: (consoleMessage: any, consoleData?: any, consoleData1?: any) =>
    console.warn(consoleMessage, consoleData, consoleData1)
}
