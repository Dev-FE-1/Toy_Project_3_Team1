import { useState, KeyboardEvent } from 'react'

const MAX_TAG_COUNT = 6
const MAX_TAG_LENGTH = 7

const useTags = () => {
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isTagValid, setIsTagValid] = useState(true)

  const handleAddTag = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() !== '' && e.nativeEvent.isComposing === false) {
      e.preventDefault()

      if (tags.length >= MAX_TAG_COUNT) {
        setIsTagValid(false)
        setCurrentTag('')
        return
      }

      const saveTag = currentTag.trim().startsWith('#')
        ? currentTag.trim()
        : `#${currentTag.trim()}`

      if (saveTag.length > MAX_TAG_LENGTH) {
        setIsTagValid(false)
        setCurrentTag('')
        return
      }

      setIsTagValid(true)
      setTags((prev: string[]) => [...prev, saveTag])
      setCurrentTag('')
    }
  }

  const handleDeleteTag = (id: number) => {
    setTags((prev) => prev.filter((_, index) => index !== id))
  }

  return {
    tags,
    currentTag,
    setCurrentTag,
    isTagValid,
    handleAddTag,
    handleDeleteTag,
    setTags,
  }
}

export default useTags
