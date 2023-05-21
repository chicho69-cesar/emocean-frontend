export const getTextDate = (date) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ]

  let textDate =
    days[date.getDay()] +
    ' ' +
    date.getDate() +
    ' de ' +
    months[date.getMonth()] +
    ' del ' +
    date.getFullYear()

  return textDate
}
