import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const getRandomElements = (arr: string[], n: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

const getRecommendTags = async (): Promise<string[]> => {
  try {
    const tagsQuery = collection(db, 'PLAYLISTS')
    const querySnapshot = await getDocs(tagsQuery)

    let allTags: string[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.tags && Array.isArray(data.tags)) {
        allTags = allTags.concat(data.tags)
      }
    })

    const uniqueTags = [...new Set(allTags)]
    const randomTags = getRandomElements(uniqueTags, 12)

    return randomTags
  } catch (error) {
    console.error('Error getting tags:', error)
    return []
  }
}

export default getRecommendTags
