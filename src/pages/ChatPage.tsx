import { lazy, Suspense } from 'react'

const Comments = lazy(() => import('@/components/Comments'))

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading comments...</div>}>
      <Comments />
    </Suspense>
  )
}

export default ChatPage
