import { useState, KeyboardEvent } from 'react'
import { MESSAGES } from '@/constants/messages'

export const MAX_TAG_COUNT = 6
export const MAX_TAG_LENGTH = 7

const useTags = () => {
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isTagValid, setIsTagValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddTag = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() !== '' && e.nativeEvent.isComposing === false) {
      e.preventDefault()

      if (currentTag.includes(' ')) {
        setIsTagValid(false)
        setErrorMessage(MESSAGES.CREATE_PL.TAG_SPACE_FAIL)
        setCurrentTag('')
        return
      }

      if (tags.length >= MAX_TAG_COUNT) {
        setIsTagValid(false)
        setErrorMessage(MESSAGES.CREATE_PL.TAG_COUNT_FAIL)
        setCurrentTag('')
        return
      }

      const saveTag = currentTag.trim().startsWith('#')
        ? currentTag.trim()
        : `#${currentTag.trim()}`

      if (saveTag.length > MAX_TAG_LENGTH) {
        setIsTagValid(false)
        setErrorMessage(MESSAGES.CREATE_PL.TAG_LENGTH_FAIL)
        setCurrentTag('')
        return
      }

      setIsTagValid(true)
      setErrorMessage('')
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
    errorMessage,
    handleAddTag,
    handleDeleteTag,
    setTags,
  }
}

export default useTags
