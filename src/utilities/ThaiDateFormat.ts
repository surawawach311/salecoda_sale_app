import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'

dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra)

export const ThaiDateFormat = (datetime: string): string => {
  return dayjs(datetime, 'yyyy-MM-dd HH:mm:ss')
    .locale('th')
    .format('D MMM BBBB')
}

export const ThaiTimeFormat = (datetime: string) => {
  return dayjs(datetime, 'yyyy-MM-dd HH:mm:ss')
    .locale('th')
    .format('H:mmน.')
}
