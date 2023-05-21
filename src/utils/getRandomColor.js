export default function getRandomColor() {
  const colors = [
    '#DDFFC2',
    '#FFC2C2',
    '#FFEAC2',
    '#C2FFD3',
    '#C2FFEC',
    '#C2FAFF',
    '#C2E2FF',
    '#CBC2FF',
    '#EBC2FF',
    '#FFC2F7',
    '#FFC2D8'
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}
