const formatDate = (timestamp: number) => {
  if (!timestamp) return ''

  // @ts-expect-error Firestore timestamp type
  const date = timestamp.toDate()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${month}.${day} ${hours}:${minutes}`
}

export default formatDate
