import { Timestamp } from 'firebase/firestore'

const formatDate = (timestamp: Timestamp | number | Date) => {
  let date: Date

  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate()
  } else if (typeof timestamp === 'number') {
    date = new Date(timestamp)
  } else if (timestamp instanceof Date) {
    date = timestamp
  } else {
    console.error('Invalid timestamp format')
    return 'Invalid Date'
  }

  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${month}.${day} ${hours}:${minutes}`
}

export default formatDate
