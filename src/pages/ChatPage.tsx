import { lazy, Suspense } from 'react'
import LikeButton from '@/components/LikeButton'

const Comments = lazy(() => import('@/components/Comments'))

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading comments...</div>}>
      <LikeButton playlistId="playlistId" />
      <Comments />
    </Suspense>
  )
}

export default ChatPage
