import * as dateFns from 'date-fns'

export function getYear(date: string) {
  return dateFns.getYear(dateFns.parseISO(date))
}
