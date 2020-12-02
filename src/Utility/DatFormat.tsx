import moment from 'moment'

export const formatDate = (value: any, format: any, language?: any) => {
  moment.locale(language || 'es')
  return moment(value).format(format)
}
